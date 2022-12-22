import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
  Session,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { SteamAuthGuard } from './auth/guards/steam-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(req.user);
    res.cookie('token', data.access_token, { httpOnly: true });
    res.json(data);
  }
  @Post('auth/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    const data = await this.authService.logout();
    res.cookie('token', data.access_token, { httpOnly: true });
    res.json(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(SteamAuthGuard)
  @Get('auth/steam')
  async loginSteam(@Request() req) {
    return req.user;
  }

  @UseGuards(SteamAuthGuard)
  @Get('auth/steam/return')
  async getSteamId(@Request() req, @Res() res: Response, @Session() session) {
    session.steam = req.user;
    return res.redirect(req.session.redirect || 'http://localhost:3000');
  }
}

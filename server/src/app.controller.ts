import {
  Controller,
  Get,
  Logger,
  Post,
  Redirect,
  Request,
  Session,
  UseGuards,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { SteamAuthGuard } from './auth/guards/steam-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  getSessionInfo(@Session() session) {
    return session.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
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
  async getSteamId(@Request() req, @Response() res) {
    req.session.steam = req.user;
    return res.redirect('http://localhost:3000');
  }
}

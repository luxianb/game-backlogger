import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavGamesService } from './favGames.service';
import { FavGame } from './favGames.interface';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('favGames')
export class FavGamesController {
  constructor(private readonly favGamesService: FavGamesService) {}

  // @Get()
  // getAllFavGames(): Promise<FavGame[]> {
  //   return this.favGamesService.findAll();
  // }
  @UseGuards(JwtAuthGuard)
  @Get()
  getUserFavGames(@Req() req: Request): Promise<FavGame[]> {
    const id = req.user['id'];
    return this.favGamesService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':appid')
  async getUserFavGameById(
    @Param('appid') appid: string,
    @Req() req: Request,
  ): Promise<boolean> {
    const id = req.user['id'];
    const favourited = await this.favGamesService.findByUserByAppid(id, appid);
    return favourited ? true : false;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async toggleFavGame(
    @Req() req: Request,
    @Body() data: FavGame,
  ): Promise<FavGame | { success: boolean }> {
    data.user_id = req.user['id'];
    const { ...body } = data;

    const favourited = await this.favGamesService.findByUserByAppid(
      body.user_id,
      body.gameid,
    );

    if (!favourited) {
      return await this.favGamesService.addFavGame(body);
    } else {
      return await this.favGamesService.removeFavGame(favourited.id);
    }
  }
}

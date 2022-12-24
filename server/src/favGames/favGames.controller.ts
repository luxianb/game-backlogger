import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { FavGamesService } from './favGames.service';
import { FavGame } from './favGames.interface';
import { Request } from 'express';

@Controller('favGames')
export class FavGamesController {
  constructor(private readonly favGamesService: FavGamesService) {}

  @Get()
  getAllFavGames(): Promise<FavGame[]> {
    return this.favGamesService.findAll();
  }
  @Get(':id')
  getUserFavGames(@Param('id') id: number): Promise<FavGame[]> {
    return this.favGamesService.findByUser(id);
  }
  @Post()
  toggleFavGame(
    @Req() req: Request,
    @Body() data: FavGame,
  ): Promise<FavGame | { success: boolean }> {
    const { favourited, ...body } = data;

    if (favourited) {
      return this.favGamesService.addFavGame(body);
    } else {
      return this.favGamesService.removeFavGame(body.id);
    }
  }
}

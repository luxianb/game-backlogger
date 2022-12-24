import { Module } from '@nestjs/common';
import { FavGamesController } from './favGames.controller';
import { FavGamesService } from './favGames.service';

@Module({
  controllers: [FavGamesController],
  providers: [FavGamesService],
  exports: [FavGamesService],
})
export class FavGamesModule {}

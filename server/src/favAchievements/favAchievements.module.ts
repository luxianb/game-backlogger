import { Module } from '@nestjs/common';
import { FavAchievementsController } from './favAchievements.controller';
import { FavAchievementsService } from './favAchievements.service';

@Module({
  controllers: [FavAchievementsController],
  providers: [FavAchievementsService],
  exports: [FavAchievementsService],
})
export class FavAchievementsModule {}

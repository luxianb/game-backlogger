import { Module } from '@nestjs/common';
import { SteamModule } from 'src/steam/steam.module';
import { FavAchievementsController } from './favAchievements.controller';
import { FavAchievementsService } from './favAchievements.service';

@Module({
  imports: [SteamModule],
  controllers: [FavAchievementsController],
  providers: [FavAchievementsService],
  exports: [FavAchievementsService],
})
export class FavAchievementsModule {}

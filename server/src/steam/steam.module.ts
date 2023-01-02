import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SteamController } from './steam.controller';
import { SteamPlayerService } from './steam.playerService.service';
import { SteamService } from './steam.service';
import { SteamNewsService } from './steam.steamNews.service';
import { SteamUserService } from './steam.steamUser.service';
import { SteamWebAPIUtilService } from './steam.steamWebAPIUtil.service';
import { SteamStoreService } from './steam.store.service';
import { SteamUserStatsService } from './steam.userStats.service';

@Module({
  imports: [
    UsersModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [SteamController],
  providers: [
    SteamService,
    SteamPlayerService,
    SteamStoreService,
    SteamNewsService,
    SteamUserService,
    SteamWebAPIUtilService,
    SteamUserStatsService,
  ],
  exports: [SteamService],
})
export class SteamModule {}

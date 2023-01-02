import { Controller, Get, Param } from '@nestjs/common';
import { SteamService } from './steam.service';
import { SteamNewsService } from './steam.steamNews.service';
import { SteamUserStatsService } from './steam.userStats.service';

@Controller('steam/game')
export class SteamGameController {
  constructor(
    private steamService: SteamService,
    private steamUserStatsService: SteamUserStatsService,
    private steamNewsService: SteamNewsService,
  ) {}

  @Get(':appid/info')
  async getGameInfo(@Param('appid') appid: number) {
    const data = await this.steamService.getAppInfo(appid);
    return data;
  }

  @Get(':appid/schema')
  async getSchemaForGame(@Param('appid') appid: number) {
    const data = await this.steamUserStatsService.getSchemaForGame(appid);
    return data;
  }

  @Get(':appid/news')
  async getGameNews(@Param('appid') appid: number) {
    const data = await this.steamNewsService.getNewsForApp({ appid });
    return data;
  }

  @Get(':appid/currentPlayers')
  async getNumberOfCurrentPlayers(@Param('appid') appid: number) {
    const data = await this.steamUserStatsService.getNumberOfCurrentPlayers(
      appid,
    );
    return data;
  }

  @Get(':appid/global/stats')
  async getGlobalStatsForGame(@Param('appid') appid: number) {
    const data = await this.steamUserStatsService.getGlobalStatsForGame({
      appid,
    });
    return data;
  }

  @Get(':appid/global/achievements')
  async getGlobalAchievementPercentagesForApp(@Param('appid') appid: number) {
    const data =
      await this.steamUserStatsService.getGlobalAchievementPercentagesForApp(
        appid,
      );
    return data;
  }
}

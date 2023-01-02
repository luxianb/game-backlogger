import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Session,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SteamService } from './steam.service';
import { SteamWebAPIUtilService } from './steam.steamWebAPIUtil.service';
import { SteamStoreService } from './steam.store.service';

@Controller('steam')
export class SteamController {
  constructor(
    private usersService: UsersService,
    private steamService: SteamService,
    private steamStoreService: SteamStoreService,
    private steamWebAPIUtilService: SteamWebAPIUtilService,
  ) {}

  @Post('return')
  async setSteamReturnLink(@Session() session, @Body() body) {
    // Logger.debug(body);
    session.redirect = body.link;
    return { success: true };
  }

  @Get('profile/:id')
  async getSteamProfile(@Param('id') id) {
    const data = await this.steamService.getPlayerSummaries(id);
    return data;
  }
  @Get('profile/:id/gamelist')
  async getUserGameList(@Param('id') id) {
    const data = await this.steamService.getOwnedGames(id);
    return data;
  }
  @Get('profile/:id/gamelist/:appid')
  async getUserGameDetail(@Param('id') id, @Param('appid') appid) {
    const data = await this.steamService.getUserGameDetail(id, appid);
    return data;
  }
  @Get('profile/:id/recent')
  async getUserRecentGames(@Param('id') id) {
    const data = await this.steamService.getRecentlyPlayedGames(id);
    return data;
  }
  @Get('profile/:id/stat/:appId')
  async getUserGameStat(@Param('id') id, @Param('appId') appId) {
    const data = await this.steamService.getUserStatsForGame(id, appId);
    return data;
  }
  @Get('profile/:id/achievements/:appId')
  async getUserGameAchievements(@Param('id') id, @Param('appId') appId) {
    const data = await this.steamService.getPlayerAchievements(id, appId);
    return data;
  }
  @Get('profile/:id/friends')
  async getUserFriendsList(@Param('id') id) {
    const data = await this.steamService.getFriendList(id);
    return data;
  }
  @Get('game/list')
  async getGameList() {
    const data = await this.steamService.getAppList();
    return data;
  }
  @Get('game/info/:appId')
  async getGameInfo(@Param('appId') appId) {
    const data = await this.steamService.getAppInfo(appId);
    return data;
  }
  @Get('game/achievement/:appId')
  async getGlobalAchivementStat(@Param('appId') appId) {
    const data = await this.steamService.getGlobalAchievementPercentagesForApp(
      appId,
    );
    return data;
  }
  @Get('game/schema/:appId')
  async getSchemaForGame(@Param('appId') appId) {
    const data = await this.steamService.getSchemaForGame(appId);
    return data;
  }
  @Get('game/news/:appId')
  async getGameNews(@Param('appId') appId) {
    const data = await this.steamService.getNewsForApp(appId);
    return data;
  }

  @Get('store/all')
  async getAppList() {
    const data = await this.steamStoreService.getAppList({
      include_dlc: true,
      include_hardware: true,
      include_software: true,
      include_videos: true,
    });
    return data;
  }
  @Get('store/game')
  async geGameList() {
    const data = await this.steamStoreService.getAppList({
      max_results: 10000,
    });
    return data;
  }
  @Get('store/dlc')
  async getDLCList() {
    const data = await this.steamStoreService.getAppList({
      include_dlc: true,
      include_games: false,
    });
    return data;
  }
  @Get('store/hardware')
  async getHardwareList() {
    const data = await this.steamStoreService.getAppList({
      include_hardware: true,
      include_games: false,
    });
    return data;
  }
  @Get('store/software')
  async getSoftwareList() {
    const data = await this.steamStoreService.getAppList({
      include_software: true,
      include_games: false,
    });
    return data;
  }
  @Get('store/video')
  async getVideoList() {
    const data = await this.steamStoreService.getAppList({
      include_videos: true,
      include_games: false,
    });
    return data;
  }

  @Get('help')
  async getSupportedAPIList() {
    const data = await this.steamWebAPIUtilService.getSupportedAPIList();
    return data?.apilist?.interfaces?.filter(({ name }) => {
      if (name.includes('ICSGO')) return false;
      if (name.includes('DOTA2')) return false;
      if (name.includes('ITF')) return false;
      if (name.includes('IEconItems_')) return false;
      if (name.includes('IGCVersion_')) return false;
      if (name.includes('Portal2')) return false;
      return true;
    });
  }
}

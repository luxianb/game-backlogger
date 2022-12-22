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

@Controller('steam')
export class SteamController {
  constructor(
    private usersService: UsersService,
    private steamService: SteamService,
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
    // Logger.log(data);
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
}

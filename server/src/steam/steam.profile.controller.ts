import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  Logger,
  Post,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SteamPlayerService } from './steam.playerService.service';
import { SteamUserService } from './steam.steamUser.service';
import { SteamUserStatsService } from './steam.userStats.service';

@Controller('steam/profile')
export class SteamProfileController {
  private readonly logger = new Logger(SteamProfileController.name);
  constructor(
    private steamUserService: SteamUserService,
    private steamPlayerService: SteamPlayerService,
    private steamUserStatsService: SteamUserStatsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getPlayerSummaries(@Req() req: Request) {
    const steamid = req.user['steamId'];
    const data = await this.steamUserService.getPlayerSummaries(steamid);
    return data[0];
  }

  @UseGuards(JwtAuthGuard)
  @Get('/gamelist')
  async getOwnedGames(@Req() req: Request) {
    const steamid = req.user['steamId'];
    const data = await this.steamPlayerService.getOwnedGames({ steamid });
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/gamelist')
  async getOwnedGamesDetail(@Req() req: Request) {
    const steamid = req.user['steamId'];
    const { appids_filter } = req.body;
    const data = await this.steamPlayerService.getOwnedGames({
      steamid,
      appids_filter,
    });

    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/gamelist/:appid')
  async getOwnedGameDetail(@Req() req: Request, @Param('appid') appid: number) {
    const steamid = req.user['steamId'];
    const data = await this.steamPlayerService.getOwnedGames({
      steamid,
      appids_filter: [appid],
    });

    return data?.games[0];
  }

  @UseGuards(JwtAuthGuard)
  @Get('/recent')
  async getRecentlyPlayedGames(@Req() req: Request) {
    const steamid = req.user['steamId'];
    // this.logger.log(steamid);
    const data = await this.steamPlayerService.getRecentlyPlayedGames(steamid);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/stat/:appId')
  async getUserStatsForGame(
    @Req() req: Request,
    @Param('appId') appId: number,
  ) {
    const steamid = req.user['steamId'];
    const data = await this.steamUserStatsService.getUserStatsForGame(
      steamid,
      appId,
    );
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/achievements/:appId')
  async getPlayerAchievements(
    @Req() req: Request,
    @Param('appId') appId: number,
  ) {
    const steamid = req.user['steamId'];
    const data = await this.steamUserStatsService.getPlayerAchievements(
      steamid,
      appId,
    );
    return data?.playerstats?.achievements;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/friends')
  async getFriendList(@Req() req: Request) {
    const steamid = req.user['steamId'];
    const data = await this.steamUserService.getFriendList(steamid);
    return data;
  }
}

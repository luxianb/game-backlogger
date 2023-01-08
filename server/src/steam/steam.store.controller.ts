import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { SteamStoreService } from './steam.store.service';

@Controller('steam/store')
export class SteamStoreController {
  constructor(private steamStoreService: SteamStoreService) {}

  @Get('all')
  async getAppList(@Req() req: Request) {
    const params = {};
    const { max_results, last_appid, if_modified_since } = req.query;
    if (max_results) params['max_results'] = max_results;
    if (last_appid) params['last_appid'] = last_appid;
    if (if_modified_since) params['if_modified_since'] = if_modified_since;

    const data = await this.steamStoreService.getAppList({
      include_dlc: true,
      include_hardware: true,
      include_software: true,
      include_videos: true,
      ...params,
    });
    return data;
  }
  @Get('game')
  async geGameList(@Req() req: Request) {
    const params = {};
    const { max_results, last_appid, if_modified_since } = req.query;
    if (max_results) params['max_results'] = max_results;
    if (last_appid) params['last_appid'] = last_appid;
    if (if_modified_since) params['if_modified_since'] = if_modified_since;
    console.log('🚀  SteamStoreController  params', params);

    const data = await this.steamStoreService.getAppList({
      max_results: 10000,
      ...params,
    });
    return data;
  }
  @Get('dlc')
  async getDLCList(@Req() req: Request) {
    const params = {};
    const { max_results, last_appid, if_modified_since } = req.query;
    if (max_results) params['max_results'] = max_results;
    if (last_appid) params['last_appid'] = last_appid;
    if (if_modified_since) params['if_modified_since'] = if_modified_since;

    const data = await this.steamStoreService.getAppList({
      include_dlc: true,
      include_games: false,
      ...params,
    });
    return data;
  }
  @Get('hardware')
  async getHardwareList(@Req() req: Request) {
    const params = {};
    const { max_results, last_appid, if_modified_since } = req.query;
    if (max_results) params['max_results'] = max_results;
    if (last_appid) params['last_appid'] = last_appid;
    if (if_modified_since) params['if_modified_since'] = if_modified_since;

    const data = await this.steamStoreService.getAppList({
      include_hardware: true,
      include_games: false,
      ...params,
    });
    return data;
  }
  @Get('software')
  async getSoftwareList(@Req() req: Request) {
    const params = {};
    const { max_results, last_appid, if_modified_since } = req.query;
    if (max_results) params['max_results'] = max_results;
    if (last_appid) params['last_appid'] = last_appid;
    if (if_modified_since) params['if_modified_since'] = if_modified_since;

    const data = await this.steamStoreService.getAppList({
      include_software: true,
      include_games: false,
      ...params,
    });
    return data;
  }
  @Get('video')
  async getVideoList(@Req() req: Request) {
    const params = {};
    const { max_results, last_appid, if_modified_since } = req.query;
    if (max_results) params['max_results'] = max_results;
    if (last_appid) params['last_appid'] = last_appid;
    if (if_modified_since) params['if_modified_since'] = if_modified_since;

    const data = await this.steamStoreService.getAppList({
      include_videos: true,
      include_games: false,
      ...params,
    });
    return data;
  }
}

import { Controller, Get } from '@nestjs/common';
import { SteamStoreService } from './steam.store.service';

@Controller('steam/store')
export class SteamController {
  constructor(private steamStoreService: SteamStoreService) {}

  @Get('all')
  async getAppList() {
    const data = await this.steamStoreService.getAppList({
      include_dlc: true,
      include_hardware: true,
      include_software: true,
      include_videos: true,
    });
    return data;
  }
  @Get('game')
  async geGameList() {
    const data = await this.steamStoreService.getAppList({
      max_results: 10000,
    });
    return data;
  }
  @Get('dlc')
  async getDLCList() {
    const data = await this.steamStoreService.getAppList({
      include_dlc: true,
      include_games: false,
    });
    return data;
  }
  @Get('hardware')
  async getHardwareList() {
    const data = await this.steamStoreService.getAppList({
      include_hardware: true,
      include_games: false,
    });
    return data;
  }
  @Get('software')
  async getSoftwareList() {
    const data = await this.steamStoreService.getAppList({
      include_software: true,
      include_games: false,
    });
    return data;
  }
  @Get('video')
  async getVideoList() {
    const data = await this.steamStoreService.getAppList({
      include_videos: true,
      include_games: false,
    });
    return data;
  }
}

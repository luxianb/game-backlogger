import { AxiosError } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom, catchError } from 'rxjs';
import { getAppListParams } from './steam.interface';

const key = process.env.STEAM_API_KEY;

@Injectable()
export class SteamStoreService {
  private readonly logger = new Logger(SteamStoreService.name);
  constructor(private readonly httpService: HttpService) {}

  async getAppList({
    if_modified_since,
    have_description_language,
    include_games = true,
    include_dlc = false,
    include_software = false,
    include_videos = false,
    include_hardware = false,
    last_appid,
    max_results = 10000,
  }: getAppListParams): Promise<any> {
    const url = `https://api.steampowered.com/IStoreService/GetAppList/v1/`;
    const params = {
      key,
      include_games,
      include_dlc,
      include_hardware,
      include_software,
      include_videos,
      max_results,
    };
    if (if_modified_since) params['if_modified_since'] = if_modified_since;
    if (have_description_language)
      params['have_description_language'] = have_description_language;
    if (last_appid) params['last_appid'] = last_appid;

    const data = await lastValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((res) => res?.data?.response?.apps),
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw 'Error fetching data';
        }),
      ),
    );
    return data;
  }
}

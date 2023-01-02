import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { map, lastValueFrom, catchError } from 'rxjs';
import { getNewsForAppParams } from './steam.interface';

const key = process.env.STEAM_API_KEY;

@Injectable()
export class SteamNewsService {
  private readonly logger = new Logger(SteamNewsService.name);
  constructor(private readonly httpService: HttpService) {}

  async getNewsForApp({
    appid,
    maxlength,
    enddate,
    count,
    feeds,
  }: getNewsForAppParams): Promise<any> {
    const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/`;
    const params = { appid };
    if (maxlength) params['maxlength'] = maxlength;
    if (enddate) params['enddate'] = enddate;
    if (count) params['count'] = count;
    if (feeds) params['feeds'] = feeds.join();

    const data = await lastValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((res) => res?.data),
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw 'Error fetching data';
        }),
      ),
    );
    return data;
  }
}

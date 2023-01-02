import { AxiosError } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom, catchError } from 'rxjs';

const key = process.env.STEAM_API_KEY;

@Injectable()
export class SteamUserService {
  private readonly logger = new Logger(SteamUserService.name);
  constructor(private readonly httpService: HttpService) {}

  async getFriendList(steamid: string, relationship = 'friend'): Promise<any> {
    const url = `https://partner.steam-api.com/ISteamUser/GetFriendList/v1/`;
    const params = { key, steamid, relationship };
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
  async getPlayerBans(steamid: string[] | string): Promise<any> {
    const url = `https://partner.steam-api.com/ISteamUser/GetPlayerBans/v1/`;
    const params = { key };
    if (typeof steamid === 'string') {
      params['steamid'] = steamid;
    }
    if (Array.isArray(steamid)) {
      params['steamid'] = steamid.join();
    }

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
  async getPlayerSummaries(steamid: string[] | string): Promise<any> {
    const url = `GetPlayerSummaries`;
    const params = { key };
    if (typeof steamid === 'string') {
      params['steamid'] = steamid;
    }
    if (Array.isArray(steamid)) {
      params['steamid'] = steamid.join();
    }

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

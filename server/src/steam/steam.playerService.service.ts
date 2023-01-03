import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { map, lastValueFrom, catchError } from 'rxjs';
import { getOwnedGamesParams } from './steam.interface';

const key = process.env.STEAM_API_KEY;

@Injectable()
export class SteamPlayerService {
  private readonly logger = new Logger(SteamPlayerService.name);
  constructor(private readonly httpService: HttpService) {}

  async getRecentlyPlayedGames(steamid: string, count?: number): Promise<any> {
    const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/`;
    const params = { key, steamid };
    if (count) params['count'] = count;

    const data = await lastValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((res) => res.data?.response),
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw 'Error fetching data';
        }),
      ),
    );
    return data;
  }

  async getOwnedGames({
    steamid,
    include_appinfo = true,
    include_played_free_games = true,
    include_extended_appinfo = true,
    appids_filter = [],
  }: getOwnedGamesParams): Promise<any> {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/`;
    const params = {
      key,
      steamid,
      include_appinfo,
      include_played_free_games,
      include_extended_appinfo,
    };
    if (appids_filter.length) {
      for (let i = 0; i < appids_filter.length; i++) {
        params[`appids_filter[${i}]`] = appids_filter[i];
      }
    }

    const data = await lastValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((res) => res?.data?.response),
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw 'Error fetching data';
        }),
      ),
    );
    return data;
  }

  async getSteamLevel(steamid: string): Promise<any> {
    const url = `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/`;
    const params = { key, steamid };

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

  async getBadges(steamid: string): Promise<any> {
    const url = `https://api.steampowered.com/IPlayerService/GetBadges/v1/`;
    const params = { key, steamid };
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

  async getCommunityBadgeProgress(
    steamid: string,
    badgeid: string,
  ): Promise<any> {
    const url = `https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/`;
    const params = { key, steamid, badgeid };
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

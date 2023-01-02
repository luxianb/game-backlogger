import { AxiosError } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom, catchError } from 'rxjs';
import { getGlobalStatsForGameParams } from './steam.interface';

const key = process.env.STEAM_API_KEY;

@Injectable()
export class SteamUserStatsService {
  private readonly logger = new Logger(SteamUserStatsService.name);
  constructor(private readonly httpService: HttpService) {}

  async getGlobalAchievementPercentagesForApp(gameid: number): Promise<any> {
    const url = `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/`;
    const params = { gameid };
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
  async getGlobalStatsForGame({
    appid,
    count,
    name = [],
    startdate,
    enddate,
  }: getGlobalStatsForGameParams): Promise<any> {
    const url = `https://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v1/`;
    const params = { appid, count };
    if (startdate) params['startdate'] = startdate;
    if (enddate) params['enddate'] = enddate;
    if (name.length) {
      for (let i = 0; i < name.length; i++) {
        params[`name[${i}]`] = name[i];
      }
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

  async getNumberOfCurrentPlayers(appid: number): Promise<any> {
    const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/`;
    const params = { appid };
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
  async getPlayerAchievements(
    steamid: string,
    appid: number,
    l = 'english',
  ): Promise<any> {
    const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/`;
    const params = { key, steamid, appid, l };
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
  async getSchemaForGame(appid: number, l = 'english'): Promise<any> {
    const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/`;
    const params = { key, appid, l };
    const data = await lastValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((res) => res?.data?.game),
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw 'Error fetching data';
        }),
      ),
    );
    return data;
  }
  async getUserStatsForGame(steamid: string, appid: number): Promise<any> {
    const url = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/`;
    const params = { key, steamid, appid };
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

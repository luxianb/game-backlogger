import axios, { AxiosResponse } from 'axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { KNEX_CONNECTION } from 'src/knex';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';

const key = process.env.STEAM_API_KEY;

@Injectable()
export class SteamService {
  constructor(
    @Inject(KNEX_CONNECTION) private readonly knex,
    private readonly httpService: HttpService,
  ) {}

  async getPlayerSummaries(steamids: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`;
    const params = { key, steamids };
    const data = await axios
      .get(url, { params })
      .then((res) => res.data?.response?.players[0]);
    return data;
  }

  async getOwnedGames(
    steamid: string,
    include_played_free_games = true,
    include_appinfo = true,
  ): Promise<any> {
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`;
    const params = {
      key,
      steamid,
      include_played_free_games,
      include_appinfo,
      format: 'json',
    };

    const data = await lastValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((res) => {
          return res.data.response;
        }),
      ),
    );
    return data;
  }
  async getRecentlyPlayedGames(steamid: string, count?: number): Promise<any> {
    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/`;
    const params = { key, steamid };
    if (count) Object.assign(params, { count });

    const data = await axios
      .get(url, { params })
      .then((res) => res.data?.response);

    return data;
  }
  async getUserStatsForGame(steamid: string, appid: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/`;
    const params = { key, appid, steamid, l: 'english' };
    const data = await lastValueFrom(
      this.httpService
        .get(url, { params })
        .pipe(map((res) => res.data?.playerstats?.achievements)),
    );

    return data;
  }
  async getPlayerAchievements(steamid: string, appid: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/`;
    const params = { appid, key, steamid, l: 'english' };
    const data = await lastValueFrom(
      this.httpService
        .get(url, { params })
        .pipe(map((res) => res.data?.playerstats?.achievements)),
    );
    return data;
  }
  async getGlobalAchievementPercentagesForApp(gameid: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/`;
    const params = { gameid };
    const data = await axios.get(url, { params }).then((res) => res.data);
    return data;
  }
  async getGlobalStatsForGame(appid: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v1/`;
    const params = { appid };
    const data = await axios.get(url, { params }).then((res) => res.data);
    return data;
  }
  async getNumberOfCurrentPlayers(appid: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/`;
    const params = { appid };
    const data = await axios.get(url, { params }).then((res) => res.data);
    return data;
  }
  async getSchemaForGame(appid: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/`;
    const params = { key, appid, l: 'english' };
    const data = await lastValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((res) => {
          return res.data?.game;
        }),
      ),
    );
    return data;
  }
  async getNewsForApp(appid: string, count = 3, maxlength = 300): Promise<any> {
    const url = `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/`;
    const params = { appid, count, maxlength };
    const data = await axios.get(url, { params }).then((res) => res.data);
    return data;
  }
  async getFriendList(steamid: string, relationship = 'friend'): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/`;
    const params = { key, steamid, relationship };
    const data = await axios.get(url, { params }).then((res) => res.data);
    return data;
  }
  async getAppList(): Promise<any> {
    const url = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;
    const params = { key };
    const data = await lastValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((res) => {
          return res.data.applist.apps;
        }),
      ),
    );
    return data;
  }
  async getAppInfo(appids: string): Promise<any> {
    const url = `http://store.steampowered.com/api/appdetails`;
    const params = { appids, l: 'english' };
    const data = await axios.get(url, { params }).then((res) => {
      const ids = Object.keys(res.data);
      if (ids.length === 1) {
        return res.data[ids[0]].data;
      }
      return res.data;
    });
    return data;
  }
}

import axios, { AxiosResponse } from 'axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { KNEX_CONNECTION } from 'src/knex';
import { HttpService } from '@nestjs/axios';

const key = process.env.STEAM_API_KEY;

@Injectable()
export class SteamService {
  constructor(
    @Inject(KNEX_CONNECTION) private readonly knex,
    private readonly httpService: HttpService,
  ) {}
  private SteamProfiles = () => this.knex('steamProfiles');

  // async findProfile(id: number): Promise<any> {
  //   return await this.SteamProfiles().where({ identifier: id }).first();
  // }
  // async addProfile(steamInfo): Promise<any> {
  //   const profileFound = await this.SteamProfiles()
  //     .where({
  //       identifier: steamInfo.id,
  //     })
  //     .first();

  //   if (profileFound) return this.updateProfile(profileFound.id, steamInfo);

  //   const id = await this.SteamProfiles().insert(steamInfo);
  //   return await this.SteamProfiles().where({ id }).first();
  // }
  // async updateProfile(id, steamInfo): Promise<any> {
  //   steamInfo.updatedAt = this.knex.fn.now();
  //   await this.SteamProfiles().where({ id }).update(steamInfo);
  //   return await this.SteamProfiles().where({ id }).first();
  // }
  // async deleteProfile(id): Promise<any> {
  //   return await this.SteamProfiles().where({ id }).delete();
  // }

  async getPlayerSummaries(steamids: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`;
    const params = { key, steamids };
    const data = await axios
      .get(url, { params })
      .then((res) => res.data?.response?.players[0]);
    return data;
  }
  // async getOwnedGames(
  //   steamid: string,
  //   // include_played_free_games = true,
  //   include_appinfo = 1,
  //   // format = 'json',
  // ): Promise<any> {
  //   const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`;
  //   const params = {
  //     key,
  //     steamid,
  //     // include_played_free_games,
  //     // format,
  //     include_appinfo,
  //   };

  //   const res = await axios.get(url, { params }).then((res) => {
  //     return res?.data?.response;
  //   });
  //   Logger.log(res);
  //   return {};
  // }
  async getOwnedGames(
    steamid: string,
    // include_played_free_games = true,
    include_appinfo = 1,
    // format = 'json',
  ): Promise<any> {
    let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`;
    url += `?key=${key}`;
    url += `&steamid=${steamid}`;
    // if (format) url += `&format=${format}`;
    // if (include_played_free_games) url += `&include_played_free_games=${include_played_free_games}`;
    // if (include_appinfo) url += `&include_appinfo=${include_appinfo}`;

    return this.httpService.get(url);
  }
  async getRecentlyPlayedGames(steamid: string, count?: number): Promise<any> {
    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/`;
    const params = { key, steamid };
    if (count) Object.assign(params, { count });

    const data = await axios
      .get(url, { params })
      .then((res) => res.data?.response);

    if (data.games.length) {
      data.games = data.games.map((item) => ({
        ...item,
        img_icon_url:
          item.img_icon_url &&
          `http://media.steampowered.com/steamcommunity/public/images/apps/${item?.appid}/${item?.img_icon_url}.jpg`,
      }));
    }
    return data;
  }
  async getUserStatsForGame(steamid: string, appid: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/`;
    const params = { appid, key, steamid };
    const data = await axios.get(url, { params }).then((res) => res.data);

    return data;
  }
  async getPlayerAchievements(steamid: string, appid: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/`;
    const params = { appid, key, steamid };
    const data = await axios.get(url, { params }).then((res) => res.data);
    return data;
  }
  async getGlobalAchievementPercentagesForApp(gameid: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/`;
    const params = { gameid };
    const data = await axios.get(url, { params }).then((res) => res.data);
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
    const data = await axios.get(url, { params }).then((res) => res.data);
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

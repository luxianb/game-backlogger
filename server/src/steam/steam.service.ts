import axios from 'axios';
import { Injectable } from '@nestjs/common';

const key = process.env.STEAM_API_KEY;

@Injectable()
export class SteamService {
  async getPlayerSummaries(steamids: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`;
    const params = { key, steamids };
    const data = await axios.get(url, { params }).then((res) => res.data);
    return data;
  }
  async getOwnedGames(
    steamid: string,
    include_appinfo = true,
    include_played_free_games = true,
  ): Promise<any> {
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`;
    const params = { key, steamid, include_appinfo, include_played_free_games };

    const data = await axios.get(url, { params }).then((res) => res.data);
    return data;
  }
  async getRecentlyPlayedGames(steamid: string, count?: number): Promise<any> {
    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/`;
    const params = { key, steamid };
    if (count) Object.assign(params, { count });

    const data = await axios.get(url, { params }).then((res) => res.data);
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
}

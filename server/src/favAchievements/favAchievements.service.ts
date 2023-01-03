import { Inject, Injectable, Logger } from '@nestjs/common';
import { SteamService } from 'src/steam/steam.service';
import { KNEX_CONNECTION } from '../knex';
import {
  FavAchievement,
  FavAchievementGameList,
} from './favAchievements.interface';

@Injectable()
export class FavAchievementsService {
  constructor(
    @Inject(KNEX_CONNECTION) private readonly knex,
    private readonly steamService: SteamService,
  ) {}
  private FavAchievements = () => this.knex('favAchievements');
  private GameLists = () => this.knex('favAchievementGameLists');

  async find(
    user_id: number,
    appid: number,
    apiname: string,
  ): Promise<FavAchievement> {
    return await this.FavAchievements()
      .where({ user_id, appid, apiname })
      .first();
  }
  async findAll(): Promise<FavAchievement[]> {
    return await this.FavAchievements().select('*');
  }
  async findByUser(user_id: number): Promise<FavAchievement[]> {
    return await this.FavAchievements().where({ user_id }).select('*');
  }
  async findByUserByGame(
    user_id: number,
    appid: number,
  ): Promise<FavAchievement[]> {
    return await this.FavAchievements().where({ user_id, appid }).select('*');
  }
  async addFavAchievements(body: FavAchievement): Promise<FavAchievement> {
    const id = await this.FavAchievements().insert(body);
    await this.findOrCreateGamelist(body.appid, body.user_id);
    return await this.FavAchievements().where({ id }).first();
  }

  async updatePos(
    data: Array<{ id: number; pos: number }> | { id: number; pos: number },
  ): Promise<{ success: boolean }> {
    try {
      if (Array.isArray(data)) {
        for (const item of data) {
          const { id, pos } = item;
          await this.FavAchievements().where({ id }).update({ pos });
        }
      } else if (typeof data === 'object') {
        const { id, pos } = data;
        await this.FavAchievements().where({ id }).update({ pos });
      }
      return { success: true };
    } catch (err) {
      Logger.error(FavAchievementsService.name, err);
      return { success: false };
    }
  }
  async removeFavAchievements(
    id: number,
    user_id: number,
    appid: number,
  ): Promise<{ success: boolean }> {
    await this.FavAchievements().where({ id }).delete();
    await this.checkAndRemoveGameList(appid, user_id);
    return { success: true };
  }

  async findAllUserAchievementGamelist(user_id: number) {
    const data = await this.GameLists().where({ user_id }).select('*');
    const achievements = await this.FavAchievements()
      .where({ user_id })
      .select('*');

    return data?.map((list: FavAchievementGameList) => ({
      ...list,
      achievements: achievements.filter(({ appid }) => appid === list.appid),
    }));
  }

  async findOrCreateGamelist(appid: number, user_id: number) {
    try {
      const gameList = await this.GameLists().where({ appid, user_id }).first();
      const { name } = await this.steamService.getAppInfo(appid);

      if (!gameList) await this.GameLists().insert({ user_id, appid, name });
      return { success: true };
    } catch (err) {
      Logger.error(FavAchievementsService.name, err);
      return { success: false };
    }
  }

  async updateGameListPos(
    data: Array<{ id: number; pos: number }> | { id: number; pos: number },
  ): Promise<{ success: boolean }> {
    try {
      if (Array.isArray(data)) {
        for (const item of data) {
          const { id, pos } = item;
          await this.GameLists().where({ id }).update({ pos });
        }
      } else if (typeof data === 'object') {
        const { id, pos } = data;
        await this.GameLists().where({ id }).update({ pos });
      }
      return { success: true };
    } catch (err) {
      Logger.error(FavAchievementsService.name, err);
      return { success: false };
    }
  }

  async checkAndRemoveGameList(appid: number, user_id: number) {
    try {
      const favAchievements = await this.FavAchievements()
        .where({ user_id, appid })
        .select('id');

      if (!favAchievements.length) {
        await this.GameLists().where({ user_id, appid }).delete();
      }

      return { success: true };
    } catch (err) {
      Logger.error(FavAchievementsService.name, err);
      return { success: false };
    }
  }
}

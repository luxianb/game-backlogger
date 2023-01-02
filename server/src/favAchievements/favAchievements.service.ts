import { flatten, Inject, Injectable, Logger } from '@nestjs/common';
import { SteamService } from 'src/steam/steam.service';
import { KNEX_CONNECTION } from '../knex';
import { FavAchievement } from './favAchievements.interface';

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
    gameid: number,
    achievementid: string,
  ): Promise<FavAchievement> {
    return await this.FavAchievements()
      .where({ user_id, gameid, achievementid })
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
    gameid: number,
  ): Promise<FavAchievement[]> {
    return await this.FavAchievements().where({ user_id, gameid }).select('*');
  }
  async addFavAchievements(body: FavAchievement): Promise<FavAchievement> {
    const id = await this.FavAchievements().insert(body);
    await this.findOrCreateGamelist(body.gameid, body.user_id);
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
    gameid: number,
  ): Promise<{ success: boolean }> {
    await this.FavAchievements().where({ id }).delete();
    await this.checkAndRemoveGameList(gameid, user_id);
    return { success: true };
  }

  async findOrCreateGamelist(gameid: number, user_id: number) {
    try {
      const gameList = await this.GameLists()
        .where({ gameid, user_id })
        .first();
      const { name } = await this.steamService.getAppInfo(gameid);

      if (!gameList) await this.GameLists().insert({ user_id, gameid, name });
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

  async checkAndRemoveGameList(gameid: number, user_id: number) {
    try {
      const favAchievements = await this.FavAchievements()
        .where({ user_id, gameid })
        .select('id');

      if (!favAchievements.length) {
        await this.GameLists().where({ user_id, gameid }).delete();
      }

      return { success: true };
    } catch (err) {
      Logger.error(FavAchievementsService.name, err);
      return { success: false };
    }
  }
}

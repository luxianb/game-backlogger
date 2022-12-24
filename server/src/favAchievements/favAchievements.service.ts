import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '../knex';
import { FavAchievement } from './favAchievements.interface';

@Injectable()
export class FavAchievementsService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}
  private FavAchievements = () => this.knex('favAchievements');

  async find(
    user_id: number,
    gameid: string,
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
    gameid: string,
  ): Promise<FavAchievement[]> {
    return await this.FavAchievements().where({ user_id, gameid }).select('*');
  }
  async addFavAchievements(body: FavAchievement): Promise<FavAchievement> {
    const id = await this.FavAchievements().insert(body);
    return await this.FavAchievements().where({ id }).first();
  }
  async removeFavAchievements(id: number): Promise<{ success: boolean }> {
    await this.FavAchievements().where({ id }).delete();
    return { success: true };
  }
}

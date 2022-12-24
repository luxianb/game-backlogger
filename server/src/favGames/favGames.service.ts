import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '../knex';
import { FavGame } from './favGames.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FavGamesService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}
  private FavGames = () => this.knex('favGames');

  async findAll(): Promise<FavGame[]> {
    return await this.FavGames().select('*');
  }
  async findByUser(user_id: number): Promise<FavGame[]> {
    return await this.FavGames().where({ user_id }).select('*');
  }
  async addFavGame(body: FavGame): Promise<FavGame> {
    const id = await this.FavGames().insert(body);
    return await this.FavGames().where({ id }).first();
  }
  async removeFavGame(id: number): Promise<{ success: boolean }> {
    await this.FavGames().delete({ id });
    return { success: true };
  }
}

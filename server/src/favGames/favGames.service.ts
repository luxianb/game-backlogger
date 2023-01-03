import { Inject, Injectable, Logger } from '@nestjs/common';
import { KNEX_CONNECTION } from '../knex';
import { FavGame } from './favGames.interface';

@Injectable()
export class FavGamesService {
  private readonly logger = new Logger(FavGamesService.name);
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}
  private FavGames = () => this.knex('favGames');

  async findAll(): Promise<FavGame[]> {
    return await this.FavGames().select('*');
  }
  async findByUser(user_id: number): Promise<FavGame[]> {
    return await this.FavGames().where({ user_id }).select('*');
  }
  async findByUserByAppid(user_id: number, appid: number): Promise<FavGame> {
    return await this.FavGames().where({ user_id, appid }).first();
  }
  async addFavGame(body: FavGame): Promise<FavGame> {
    const id = await this.FavGames().insert(body);
    this.logger.log(id);
    return await this.FavGames().where({ id }).first();
  }
  async removeFavGame(id: number): Promise<{ success: boolean }> {
    await this.FavGames().where({ id }).delete();
    return { success: true };
  }
}

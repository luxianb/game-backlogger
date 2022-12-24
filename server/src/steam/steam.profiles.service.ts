import axios, { AxiosResponse } from 'axios';
import { Inject, Injectable } from '@nestjs/common';
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
}

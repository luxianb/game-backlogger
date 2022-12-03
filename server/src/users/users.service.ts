// src/app.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '../knex';
import { User } from './users.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  private Users = () => this.knex('users');
  async findAll() {
    return await this.Users().select('*');
  }
  async find(id: number) {
    return await this.Users().where({ id }).first();
  }
  async findOne(username: string) {
    return await this.Users().where({ username }).first();
  }
  async create(data: User) {
    // hash password
    data.password = bcrypt.hashSync(data.password, 10);

    const id = await this.Users().insert(data);
    return await this.Users().where({ id }).first();
  }
  async update(id: number, data: User) {
    data.updatedAt = this.knex.fn.now();
    await this.Users().where({ id }).update(data);
    return await this.Users().where({ id }).first();
  }
  async delete(id: number) {
    return await this.Users().where({ id }).delete();
  }
}

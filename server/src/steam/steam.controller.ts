import { Controller, Get, Param, Session } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SteamService } from './steam.service';

@Controller('steam')
export class SteamController {
  constructor(
    private usersService: UsersService,
    private steamService: SteamService,
  ) {}

  @Get('profile')
  async getSteamProfile(@Session() session) {
    if (!session.steam && session.user) {
      const user = await this.usersService.find(session.user.id);
      if (user.steamId) {
      }
    }
    if (session.steam) return session.steam;
    return session.steam;
  }

  @Get('user/:id')
  async getUserInfo(@Param('id') id) {
    const data = await this.steamService.getPlayerSummaries(id);
    return data;
  }
}

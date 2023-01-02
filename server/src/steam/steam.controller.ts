import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SteamService } from './steam.service';
import { SteamWebAPIUtilService } from './steam.steamWebAPIUtil.service';
import { SteamStoreService } from './steam.store.service';

@Controller('steam')
export class SteamController {
  constructor(
    private usersService: UsersService,
    private steamService: SteamService,
    private steamStoreService: SteamStoreService,
    private steamWebAPIUtilService: SteamWebAPIUtilService,
  ) {}

  @Post('return')
  async setSteamReturnLink(@Session() session, @Body() body) {
    // Logger.debug(body);
    session.redirect = body.link;
    return { success: true };
  }

  @Get('help')
  async getSupportedAPIList() {
    const data = await this.steamWebAPIUtilService.getSupportedAPIList();
    return data?.apilist?.interfaces?.filter(({ name }) => {
      if (name.includes('ICSGO')) return false;
      if (name.includes('DOTA2')) return false;
      if (name.includes('ITF')) return false;
      if (name.includes('IEconItems_')) return false;
      if (name.includes('IGCVersion_')) return false;
      if (name.includes('Portal2')) return false;
      return true;
    });
  }
}

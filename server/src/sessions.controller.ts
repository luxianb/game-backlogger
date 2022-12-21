import { Controller, Get, Session, Delete, Logger } from '@nestjs/common';

@Controller('sessions')
export class SessionsController {
  @Get('steam')
  getSteamSession(@Session() session) {
    const steamProfile = { ...session.steam };
    Logger.log(session.steam);
    return steamProfile;
  }
  @Delete('steam')
  deleteSteamSession(@Session() session) {
    session.steam = {};
    return { success: true };
  }
}

import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SteamController } from './steam.controller';
import { SteamService } from './steam.service';

@Module({
  imports: [UsersModule],
  controllers: [SteamController],
  providers: [SteamService],
})
export class SteamModule {}

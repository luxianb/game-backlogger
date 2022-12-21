import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SteamController } from './steam.controller';
import { SteamService } from './steam.service';

@Module({
  imports: [
    UsersModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [SteamController],
  providers: [SteamService],
})
export class SteamModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KnexModule } from './knex';
import config from '../knexfile';
import configuration from './config/configuration';
import { SteamModule } from './steam/steam.module';
import { SessionsController } from './sessions.controller';
import { FavAchievementsModule } from './favAchievements/favAchievements.module';
import { FavGamesModule } from './favGames/favGames.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule,
    KnexModule.register(config.development),
    UsersModule,
    AuthModule,
    SteamModule,
    FavAchievementsModule,
    FavGamesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, SessionsController],
  providers: [AppService],
})
export class AppModule {}

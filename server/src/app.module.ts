import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KnexModule } from './knex';
import config from '../knexfile';
import configuration from './config/configuration';
import { SteamModule } from './steam/steam.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    KnexModule.register(config.development),
    UsersModule,
    AuthModule,
    SteamModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

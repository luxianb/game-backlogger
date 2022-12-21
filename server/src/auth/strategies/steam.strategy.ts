import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';

const port = process.env.PORT ?? 3001;

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      returnURL: `http://localhost:${port}/api/auth/steam/return`,
      realm: `http://localhost:3001/`,
      apiKey: process.env.STEAM_API_KEY,
    });
  }

  async validate(identifier: any, profile: any, done: any) {
    profile.identifier = identifier;
    return done(null, profile);
    // return {
    //   openId: identifier,
    //   steamId: profile.id,
    //   displayName: profile.displayName,
    //   photo: profile.photos[2],
    // };
  }
}

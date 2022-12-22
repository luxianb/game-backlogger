import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return payload;
    // return { userId: payload.sub, username: payload.username };
  }
}

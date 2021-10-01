import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import config from '../../config/keys'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private configService : ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
    
      token_type: 'jwt',
      expires_in:10000
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../../config/auth.config';
import { UserPayload } from '../../../common/interfaces/user.interface';
import { UUID } from 'node:crypto';

interface JwtPayload {
  email: string;
  sub: UUID;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtConfig = configService.get<JwtConfig>('auth.jwt');
    if (!jwtConfig?.secret) {
      throw new Error(
        'JWT secret is required. Set JWT_SECRET environment variable.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  validate(payload: JwtPayload): UserPayload {
    return { userId: payload.sub, email: payload.email };
  }
}

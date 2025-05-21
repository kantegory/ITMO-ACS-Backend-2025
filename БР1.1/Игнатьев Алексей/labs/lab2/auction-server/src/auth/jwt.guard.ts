import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtUserPayloadDto } from './dto/jwt.dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = JwtUserPayloadDto>(
    err: any,
    user: TUser,
    info: any,
  ): TUser {
    if (err || !user) {
      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else if (info?.message === 'No auth token') {
        throw new UnauthorizedException('Token not provided');
      }
      throw new UnauthorizedException('Invalid login or password');
    }
    return user;
  }
}

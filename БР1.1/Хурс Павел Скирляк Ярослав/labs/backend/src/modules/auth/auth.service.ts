import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

import { ConfigService } from '@nestjs/config';
import { TokenResponse } from './interfaces/token.interface';

import { User } from '../../entities/user.entity';

interface JwtPayload {
  email: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  async register(
    email: string,
    nickname: string,
    password: string,
  ): Promise<TokenResponse> {
    const existingEmail = await this.usersService.findByEmail(email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingNickname = await this.usersService.findByNickname(nickname);
    if (existingNickname) {
      throw new ConflictException('Nickname already exists');
    }

    const user = await this.usersService.create({
      email,
      nickname,
      password,
    });

    return this.generateTokens(user);
  }

  login(user: Omit<User, 'password_hash'>): TokenResponse {
    return this.generateTokens(user);
  }

  private generateTokens(user: Omit<User, 'password_hash'>): TokenResponse {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn:
          this.configService.get<string>('auth.jwt.refreshExpiresIn') || '7d',
      }),
    };
  }

  async refreshToken(refresh_token: string): Promise<TokenResponse> {
    try {
      const payload = this.jwtService.verify(refresh_token);
      const user = await this.usersService.findOne(payload.sub);
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // async setup2FA(
  //   userId: string,
  // ): Promise<{ secret: string; otpauthUrl: string }> {
  //   const secret = speakeasy.generateSecret({
  //     name: 'MovieMatch',
  //   });

  //   await this.usersService.update2FASecret(userId, secret.base32);

  //   return {
  //     secret: secret.base32,
  //     otpauthUrl: secret.otpauth_url || '',
  //   };
  // }

  // async verify2FA(userId: string, token: string): Promise<boolean> {
  //   const user = await this.usersService.findOne(userId);
  //   if (!user.google_2fa_secret) {
  //     throw new UnauthorizedException('2FA not set up');
  //   }

  //   const verified = speakeasy.totp.verify({
  //     secret: user.google_2fa_secret,
  //     encoding: 'base32',
  //     token,
  //   });

  //   if (verified) {
  //     await this.usersService.enable2FA(userId);
  //   }

  //   return verified;
  // }
}

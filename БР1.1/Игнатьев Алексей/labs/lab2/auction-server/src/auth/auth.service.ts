import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegistrationUserDto } from './dto/registration.dto';
import { UserAliasType, PrismaClient, UserAlias } from '@prisma/client';

import * as bcrypt from 'bcryptjs';
import {
  LoginResponseDto,
  LoginUserDto,
  RefreshTokenDto,
} from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'src/config/redis/redis.service';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/config/bull/bull.interface';
import { Queue } from 'bull';
import { ConfirmPasswordDto } from './dto/confirm-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import Hashids from 'hashids';
import {
  MailConfirmationCodeDto,
  MailConfirmationDto,
} from './dto/mail-confrim.dto';
@Injectable()
export class AuthService {
  private hashids: Hashids;
  constructor(
    private readonly configService: ConfigService,
    protected readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
    private redisService: RedisService,

    @InjectQueue(QUEUE_NAME.smtp)
    private smtpQueue: Queue,
  ) {
    this.hashids = new Hashids(
      this.configService.get<string>('HASHIDS_SALT'),
      10,
    );
  }
  private async validateUser(
    value: UserAliasType,
    password: string,
  ): Promise<Partial<UserAlias> | null> {
    const user = await this.prisma.userAlias.findFirst({
      where: { alias_type: UserAliasType.EMAIL, value: value },
    });
    if (user && (await bcrypt.compare(password, user.proof))) {
      return { user_id: user.user_id, value: user.value };
    }
    throw new UnauthorizedException('Invalid login or password');
  }

  async registration(
    registrationUserDto: RegistrationUserDto,
  ): Promise<StatusOKDto> {
    const { email, password, referral_code } = registrationUserDto;
    const user = await this.prisma.userAlias.findFirst({
      where: {
        alias_type: UserAliasType.EMAIL,
        value: email,
      },
    });
    if (user) {
      throw new BadRequestException('A user with this email already exists');
    }
    await this.prisma.$transaction(async (tx) => {
      let referredBy: number | null = null;

      // Если указан реферальный код, проверяем его
      if (referral_code) {
        const referrer = await tx.user.findFirst({
          where: { referral_code: referral_code },
        });

        if (!referrer) {
          throw new BadRequestException('Invalid referral code');
        }
        referredBy = referrer.user_id;
      }

      const user = await tx.user.create({ data: {} });
      const generatedReferralCode = this.hashids.encode(user.user_id);
      await tx.user.update({
        where: { user_id: user.user_id },
        data: { referral_code: generatedReferralCode },
      });

      // Привязываем email к пользователю
      await tx.userAlias.create({
        data: {
          user_id: user.user_id,
          value: email,
          proof: await bcrypt.hash(password, 12),
        },
      });

      // Если пользователь зарегистрировался по реферальному коду, создаем запись в Referral
      if (referredBy) {
        await tx.referral.create({
          data: {
            user_id: user.user_id,
            referred_by: referredBy,
            created_at: new Date(),
          },
        });
      }
    });

    // Отправляем письмо о регистрации
    await this.smtpQueue.add('registrationMessage', {
      email,
    });
    return new StatusOKDto();
  }
  async login(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(
      loginUserDto.email as UserAliasType,
      loginUserDto.password,
    );
    const payload = { email: user?.value, sub: user?.user_id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    };
  }
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<LoginResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshTokenDto.refresh_token, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });
      const jwtPayload = { email: payload.email, sub: payload.sub };
      const newAccessToken = this.jwtService.sign(jwtPayload);
      const newRefreshToken = this.jwtService.sign(jwtPayload, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      });
      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  async mailConfirmationCode(
    mailConfirmationCodeDto: MailConfirmationCodeDto,
  ): Promise<StatusOKDto> {
    const userEmail = await this.redisService.get(
      `mail-confirmation:${mailConfirmationCodeDto.code}`,
    );
    if (userEmail !== mailConfirmationCodeDto.email) {
      throw new BadRequestException('Invalid or expired code');
    }
    const user = await this.prisma.user.findFirst({
      where: { email: userEmail },
    });
    if (!user) {
      throw new BadRequestException('Invalid or expired code');
    }
    if (user.mail_confirmed) {
      throw new BadRequestException('User mail already confirmed');
    }

    await this.prisma.user.update({
      where: { user_id: user.user_id },
      data: { mail_confirmed: true },
    });
    await this.redisService.del(
      `mail-confirmation:${mailConfirmationCodeDto.code}`,
    );
    return new StatusOKDto();
  }

  async mailConfirmation(
    mailConfirmationDto: MailConfirmationDto,
  ): Promise<StatusOKDto> {
    const user = await this.prisma.user.findFirst({
      where: { email: mailConfirmationDto.email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.mail_confirmed) {
      throw new BadRequestException('User mail already confirmed');
    }
    const code = Math.floor(100000 + Math.random() * 999999);
    console.log(code);
    await this.smtpQueue.add('mailConfirmationMessage', {
      email: mailConfirmationDto.email,
      code: code,
    });
    const expirationTime = 3600;

    await this.redisService.setex(
      `mail-confirmation:${code}`,
      expirationTime,
      mailConfirmationDto.email,
    );
    return new StatusOKDto();
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<StatusOKDto> {
    const user = await this.prisma.userAlias.findFirst({
      where: { value: resetPasswordDto.email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const token = uuidv4();
    const expirationTime = 3600;

    await this.redisService.setex(
      `password-reset:${token}`,
      expirationTime,
      user.value.toString(),
    );
    await this.smtpQueue.add('resetPasswordMessage', {
      email: resetPasswordDto.email,
      link: `${this.configService.get('FRONTEND_URL')}?code=${token}`,
    });
    return new StatusOKDto();
  }
  async confirmPassword(
    confirmPasswordDto: ConfirmPasswordDto,
  ): Promise<StatusOKDto> {
    const userValue = await this.redisService.get(
      `password-reset:${confirmPasswordDto.code}`,
    );

    if (!userValue) {
      throw new BadRequestException('Invalid or expired token');
    }

    const user = await this.prisma.userAlias.findFirst({
      where: { value: userValue },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const hashedPassword = await bcrypt.hash(confirmPasswordDto.password, 12);

    await this.prisma.userAlias.update({
      where: { user_alias_id: user.user_alias_id },
      data: { proof: hashedPassword },
    });

    await this.redisService.del(`password-reset:${confirmPasswordDto.code}`);
    return new StatusOKDto();
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    userId: number,
  ): Promise<StatusOKDto> {
    const user = await this.prisma.userAlias.findFirst({
      where: { user_id: userId },
    });
    const oldPasswordCorrect = await bcrypt.compare(
      changePasswordDto.old_password,
      user!.proof,
    );
    if (oldPasswordCorrect) {
      const hashedPassword = await bcrypt.hash(
        changePasswordDto.new_password,
        12,
      );
      await this.prisma.userAlias.update({
        where: { user_alias_id: user!.user_alias_id },
        data: { proof: hashedPassword },
      });
      return new StatusOKDto();
    }
    throw new BadRequestException('No valid old password');
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationUserDto } from './dto/registration.dto';
import {
  LoginResponseDto,
  LoginUserDto,
  RefreshTokenDto,
} from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { ConfirmPasswordDto } from './dto/confirm-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.guard';
import { JwtUserPayloadDto } from './dto/jwt.dto';
import { MailConfirmationCodeDto, MailConfirmationDto } from './dto/mail-confrim.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(
    @Body() registrationUserDto: RegistrationUserDto,
  ): Promise<StatusOKDto> {
    return await this.authService.registration(registrationUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginUserDto);
  }
  @Post('mail-confirmation')
  async mailConfirmation(
    @Body() mailConfirmationDto: MailConfirmationDto,
  ): Promise<StatusOKDto> {
    return await this.authService.mailConfirmation(mailConfirmationDto);
  }

  @Post('mail-confirmation-code')
  async mailConfirmationCode(
    @Body() mailConfirmationCodeDto: MailConfirmationCodeDto,
  ): Promise<StatusOKDto> {
    return await this.authService.mailConfirmationCode(mailConfirmationCodeDto);
  }

  @Post('change-password')
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Req() req: { user: JwtUserPayloadDto },
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<StatusOKDto> {
    return await this.authService.changePassword(
      changePasswordDto,
      req.user.id,
    );
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.refreshToken(refreshTokenDto);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<StatusOKDto> {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Post('confirm-password')
  async confirmPassword(
    @Body() confirmPasswordDto: ConfirmPasswordDto,
  ): Promise<StatusOKDto> {
    return await this.authService.confirmPassword(confirmPasswordDto);
  }
}

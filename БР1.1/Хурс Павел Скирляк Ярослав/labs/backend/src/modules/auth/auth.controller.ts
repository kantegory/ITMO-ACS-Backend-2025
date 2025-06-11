import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { TokenResponse } from './interfaces/token.interface';
import { TokenResponseDto } from './dto/token.response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Email or nickname already exists.',
  })
  async register(@Body() registerDto: RegisterDto): Promise<TokenResponse> {
    return this.authService.register(
      registerDto.email,
      registerDto.nickname,
      registerDto.password,
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: TokenResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed.',
    type: TokenResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token.' })
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponse> {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  // @Post('2fa/setup')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Set up 2FA for user' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns 2FA secret and QR code URL.',
  //   type: Object,
  // })
  // async setup2FA(@Body('userId') userId: string) {
  //   return this.authService.setup2FA(userId);
  // }

  // @Post('2fa/verify')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Verify 2FA token' })
  // @ApiResponse({ status: 200, description: 'Token verified successfully.' })
  // @ApiResponse({ status: 401, description: 'Invalid token.' })
  // async verify2FA(@Body() twoFactorDto: TwoFactorDto): Promise<boolean> {
  //   return this.authService.verify2FA(twoFactorDto.userId, twoFactorDto.token);
  // }
}

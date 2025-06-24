import { Controller, Body, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.entity';
import { Request } from 'express';
import { ApiBody } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
  @Public()
  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}

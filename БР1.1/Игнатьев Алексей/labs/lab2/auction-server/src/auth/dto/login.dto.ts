import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class LoginResponseDto {
  @IsString()
  access_token: string;
  @IsString()
  refresh_token: string;
}

export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}

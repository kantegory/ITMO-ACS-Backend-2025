import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegistrationUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  @IsOptional()
  referral_code: string | null;
}

import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class UserUpdateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  profile_picture?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

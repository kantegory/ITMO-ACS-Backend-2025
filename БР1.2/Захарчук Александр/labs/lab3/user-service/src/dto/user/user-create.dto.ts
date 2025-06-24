import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class UserCreateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  profile_picture?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

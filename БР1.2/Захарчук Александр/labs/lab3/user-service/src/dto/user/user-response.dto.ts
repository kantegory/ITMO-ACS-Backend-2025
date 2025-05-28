import { IsEmail, IsInt, IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class UserResponseDto {
  @IsInt()
  id: number;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  profile_picture?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

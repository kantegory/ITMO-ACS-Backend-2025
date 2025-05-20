import { IsInt, IsString, IsEmail, IsOptional, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class UserResponseDto {
  @IsInt()
    @Type(() => Number)
  id: number;

  @IsString()
    @Type(() => String)
  name: string;

  @IsEmail()
    @Type(() => String)
  email: string;

  @IsString()
    @Type(() => String)
  password_hash: string;

  @IsOptional()
  @IsDateString()
    @Type(() => String)
  date_of_birth?: Date;

  @IsOptional()
  @IsString()
    @Type(() => String)
  gender?: string;

  @IsOptional()
  @IsInt()
    @Type(() => Number)
  role_id?: number;
}

import { IsOptional, IsString, IsEmail, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
    @Type(() => String)
  name?: string;

  @IsOptional()
  @IsEmail()
    @Type(() => String)
  email?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  password_hash?: string;

  @IsOptional()
  @IsDateString()
    @Type(() => String)
  date_of_birth?: Date;

  @IsOptional()
  @IsString()
    @Type(() => String)
  gender?: string;

  @IsOptional()
  role_id?: number;
}

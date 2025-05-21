import { IsString, IsEmail, IsOptional, IsDateString, IsDate, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto {
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
    @Type(() => String)
  gender?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  role_id?: number;
}

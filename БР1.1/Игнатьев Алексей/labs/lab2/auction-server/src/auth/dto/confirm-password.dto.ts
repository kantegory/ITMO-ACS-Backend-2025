import { IsString } from 'class-validator';

export class ConfirmPasswordDto {
  @IsString()
  code: string;
  @IsString()
  password: string;
}

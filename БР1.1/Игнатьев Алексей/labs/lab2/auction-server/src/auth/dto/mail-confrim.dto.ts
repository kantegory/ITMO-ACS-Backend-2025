import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class MailConfirmationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class MailConfirmationCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;
}

import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @Length(3)
    username!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @Length(6)
    password!: string;
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @Length(6)
    password!: string;
}
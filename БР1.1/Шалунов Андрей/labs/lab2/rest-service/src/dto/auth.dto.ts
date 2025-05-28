import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @Length(6, 50)
    password!: string;

    @IsNotEmpty()
    @Length(1, 100)
    name!: string;
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;
}
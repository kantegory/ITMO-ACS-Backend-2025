import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password!: string;
}

export class LoginUserDto {
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString({ message: 'Password must be a string' })
    password!: string;
} 
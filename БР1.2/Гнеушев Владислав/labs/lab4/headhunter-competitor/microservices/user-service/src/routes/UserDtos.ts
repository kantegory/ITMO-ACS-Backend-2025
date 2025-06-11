import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password!: string;
}

export class CreateEmployeeCabinetDto {
    @IsNotEmpty({ message: 'First name should not be empty' })
    @IsString({ message: 'First name must be a string' })
    first_name!: string;

    @IsNotEmpty({ message: 'Last name should not be empty' })
    @IsString({ message: 'Last name must be a string' })
    last_name!: string;

    @IsOptional()
    @IsString({ message: 'Resume text must be a string' })
    resume_text?: string;
}

export class UpdateEmployeeCabinetDto {
    @IsOptional()
    @IsString({ message: 'First name must be a string' })
    first_name?: string;

    @IsOptional()
    @IsString({ message: 'Last name must be a string' })
    last_name?: string;

    @IsOptional()
    @IsString({ message: 'Resume text must be a string' })
    resume_text?: string;
}

export class LoginUserDto {
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString({ message: 'Password must be a string' })
    password!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password?: string;
}

export class GetUserByIdDto {
    @IsNotEmpty({ message: 'User ID should not be empty' })
    @IsString({ message: 'User ID must be a string' })
    id!: string;
} 
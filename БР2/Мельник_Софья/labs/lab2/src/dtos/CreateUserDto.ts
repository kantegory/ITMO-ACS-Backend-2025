import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsDateString,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;

  @IsDateString({}, { message: 'Birth date must be a valid ISO date string' })
  birth_date!: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(['male', 'female'], { message: 'Gender must be male or female' })
  gender!: string;

  @IsNumber({}, { message: 'Weight must be a number' })
  weight!: number;

  @IsNumber({}, { message: 'Height must be a number' })
  height!: number;

  @IsDateString({}, { message: 'Registration date must be a valid ISO date string' })
  registration_date!: string;

  @IsNotEmpty({ message: 'Goal is required' })
  goal!: string;

  @IsNotEmpty({ message: 'Experience level is required' })
  experience_level!: string;
}
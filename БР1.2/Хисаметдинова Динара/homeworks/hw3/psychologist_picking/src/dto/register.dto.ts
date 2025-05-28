import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ZXC Meow' })
  @IsString()
  full_name: string;

  @ApiProperty({ example: '12345678' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+79991234567', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}

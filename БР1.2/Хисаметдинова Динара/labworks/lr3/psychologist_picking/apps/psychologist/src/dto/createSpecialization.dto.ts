import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecializationDto {
  @ApiProperty({ example: 'Когнитивно-поведенческая терапия' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Подходит для тревожности и фобий', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

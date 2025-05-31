import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LocalizationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Язык' })
  language: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Текст' })
  text: string;
}

export class NewsLocalizationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Язык' })
  language: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Название' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Текст' })
  text: string;
}
export class FaqLocalizationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Язык' })
  language: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Вопрос' })
  question: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Ответ' })
  answer: string;
}

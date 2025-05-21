import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  LocalizationDto,
  NewsLocalizationDto,
} from 'src/admin/dto/localization.dto';

export class CreateNewsDto {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  @ApiProperty({ description: 'Изображение' })
  image?: any;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Название' })
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Текст' })
  text: string;
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewsLocalizationDto)
  @ApiProperty({ description: 'Локализации', type: [NewsLocalizationDto] })
  locales: NewsLocalizationDto[];
}

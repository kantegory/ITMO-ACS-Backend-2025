import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocalizationDto } from 'src/admin/dto/localization.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandLocalizationDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'ID локали' })
  locale_id: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Язык' })
  language: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Текст' })
  text: string;
}

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Название бренда' })
  title: string; // Название бренда (Enum или строка)
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocalizationDto)
  @ApiProperty({ description: 'Локализации', type: [LocalizationDto] })
  locales: LocalizationDto[];
}

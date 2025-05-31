import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { LocalizationDto } from 'src/admin/dto/localization.dto';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Название категории' })
  title: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocalizationDto)
  @ApiProperty({ description: 'Локализации', type: [LocalizationDto] })
  locales: LocalizationDto[];
}

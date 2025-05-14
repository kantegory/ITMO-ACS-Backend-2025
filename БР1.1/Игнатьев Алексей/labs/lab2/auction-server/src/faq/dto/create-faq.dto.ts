import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  FaqLocalizationDto,
  LocalizationDto,
} from 'src/admin/dto/localization.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateFaqDto {
  @IsString()
  @ApiProperty({ description: 'Вопрос' })
  question: string;
  @IsString()
  @ApiProperty({ description: 'Ответ' })
  answer: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqLocalizationDto)
  @ApiProperty({ description: 'Локализации', type: [FaqLocalizationDto] })
  locales: FaqLocalizationDto[];
}

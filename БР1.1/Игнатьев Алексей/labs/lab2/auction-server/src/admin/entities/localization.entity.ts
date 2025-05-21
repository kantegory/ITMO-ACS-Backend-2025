import { ApiProperty } from '@nestjs/swagger';
import { Localization, LocalizationType } from 'prisma/prisma-client';

export class LocalizationEntity implements Localization {
  @ApiProperty({ description: 'ID локали' })
  locale_id: number;
  @ApiProperty({ description: 'Язык' })
  language: string;
  @ApiProperty({ enum: LocalizationType })
  type: string;
  @ApiProperty({ description: 'ID ссылки' })
  reference_id: number;
  @ApiProperty({ description: 'Текст' })
  text: string;
}

export class PartialLocalizationEntity {
  @ApiProperty({ description: 'ID локали' })
  locale_id: number;
  @ApiProperty({ description: 'Язык' })
  language: string;
  @ApiProperty({ description: 'Текст' })
  text: string;
}

export class NewsLocalizationEntity {
  @ApiProperty({ description: 'ID локали' })
  locale_id: number;
  @ApiProperty({ description: 'Язык' })
  language: string;
  @ApiProperty({ description: 'Название' })
  title: string;
  @ApiProperty({ description: 'Текст' })
  text: string;
}
export class FaqLocalizationEntity {
  @ApiProperty({ description: 'ID локали' })
  locale_id: number;
  @ApiProperty({ description: 'Язык' })
  language: string;
  @ApiProperty({ description: 'Вопрос' })
  question: string;
  @ApiProperty({ description: 'Ответ' })
  answer: string;
}

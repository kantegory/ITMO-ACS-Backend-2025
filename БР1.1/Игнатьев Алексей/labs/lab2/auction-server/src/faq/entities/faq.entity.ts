import { ApiProperty } from '@nestjs/swagger';
import { Faq } from 'prisma/prisma-client';
import { FaqLocalizationEntity } from 'src/admin/entities/localization.entity';

export class FaqEntity implements Faq {
  @ApiProperty({ description: 'ID FAQ' })
  faq_id: number;
  @ApiProperty({ description: 'Вопрос' })
  question: string;
  @ApiProperty({ description: 'Ответ' })
  answer: string;
  @ApiProperty({
    description: 'Локализации',
    type: [FaqLocalizationEntity],
  })
  locales: FaqLocalizationEntity[];
}

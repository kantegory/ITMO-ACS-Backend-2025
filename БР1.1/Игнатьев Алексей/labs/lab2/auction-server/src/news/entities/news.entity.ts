import { ApiProperty } from '@nestjs/swagger';
import { News } from 'prisma/prisma-client';
import { NewsLocalizationDto } from 'src/admin/dto/localization.dto';
import {
  LocalizationEntity,
  NewsLocalizationEntity,
} from 'src/admin/entities/localization.entity';

export class NewsEntity implements News {
  @ApiProperty({ description: 'ID новости' })
  news_id: number;
  @ApiProperty({ description: 'Название' })
  title: string;
  @ApiProperty({ description: 'Текст' })
  text: string;
  @ApiProperty({ description: 'URL изображения', required: false, type: String })
  image_url: string | null;
  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
  @ApiProperty({ description: 'Локализации', type: [NewsLocalizationEntity] })
  locales: NewsLocalizationEntity[];
}

import { ApiProperty } from '@nestjs/swagger';
import { SpinItem, SpinItemType } from '@prisma/client';

export class SpinItemEntity implements SpinItem {
  @ApiProperty({ description: 'ID предмета' })
  spin_item_id: number;
  @ApiProperty({ description: 'URL изображения', type: String, nullable: true })
  image_url: string | null;
  @ApiProperty({ description: 'Название', type: String, nullable: true })
  title: string | null;
  @ApiProperty({ description: 'Описание', type: String, nullable: true })
  description: string | null;
  @ApiProperty({ description: 'Сумма', type: Number, nullable: true })
  amount: number | null;
  @ApiProperty({ description: 'Вероятность', type: Number })
  probability: number;
  @ApiProperty({ description: 'Активный', type: Boolean })
  is_active: boolean;
  @ApiProperty({ enum: SpinItemType, description: 'Тип' })
  type: SpinItemType;
}

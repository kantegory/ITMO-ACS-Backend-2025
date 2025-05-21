import { ApiProperty } from '@nestjs/swagger';

export class BotEntity {
  @ApiProperty({ description: 'ID бота' })
  bot_id: number;
  @ApiProperty({ description: 'ID аукциона', required: false, type: Number })
  auction_id: number | null;
  @ApiProperty({ description: 'Активность бота' })
  is_active: boolean;
  @ApiProperty({ description: 'ID стратегии бота' })
  strategy_id: number;
  @ApiProperty({ description: 'ID пользователя' })
  user_id: number;
}

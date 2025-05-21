import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BotStrategy, BotStrategyType } from '@prisma/client';

export class BotStrategyEntity implements BotStrategy {
  @ApiProperty({ description: 'ID стратегии бота' })
  bot_strategy_id: number;
  @ApiProperty({ enum: BotStrategyType })
  type: BotStrategyType;
  @ApiPropertyOptional({
    description: 'Максимальная сумма ставки',
    required: false,
    type: Number,
  })
  max_bid_amount: number | null;
  @ApiProperty({
    description: 'Минимальная сумма ставки',
    required: false,
    type: Number,
  })
  min_bid_amount: number | null;
  @ApiProperty({
    description: 'Минимальный интервал между ставками',
    required: false,
    type: Number,
  })
  min_bid_interval: number | null;
  @ApiProperty({
    description: 'Максимальное количество участников на активацию',
    required: false,
    type: Number,
  })
  max_auction_participants: number | null;
  @ApiProperty({
    description: 'Минимальное количество участников на активацию',
    required: false,
    type: Number,
  })
  min_auction_participants: number | null;
  @ApiProperty({
    description: 'Минимальное количество участников со ставками',
    required: false,
    type: Number,
  })
  min_active_participants: number | null;
  @ApiProperty({
    description: 'Максимальное количество участников со ставками',
    required: false,
    type: Number,
  })
  max_active_participants: number | null;
  @ApiProperty({
    description: 'Минимальный размер RATO при перебитии',
    required: false,
    type: Number,
  })
  min_rato_increase: number | null;
  @ApiProperty({
    description: 'Максимальный размер RATO при перебитии',
    required: false,
    type: Number,
  })
  max_rato_increase: number | null;
  @ApiProperty({
    description: 'Время от начала аукциона',
    required: false,
    type: Number,
  })
  time_from_start: number | null;
  @ApiProperty({
    description: 'Время до окончания аукциона',
    required: false,
    type: Number,
  })
  time_to_end: number | null;
  @ApiProperty({
    description: 'Время от старта (начало)',
    required: false,
    type: Number,
  })
  time_to_start: number | null;
  @ApiProperty({
    description: 'Время до окончания (начало)',
    required: false,
    type: Number,
  })
  time_from_end: number | null;
}

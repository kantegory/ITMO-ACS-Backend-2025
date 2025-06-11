import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class SetIsActiveDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    type: [Number],
    minItems: 8,
    maxItems: 8,
    uniqueItems: true,
    description: 'ID предметов',
  })
  item_ids: number[];
}

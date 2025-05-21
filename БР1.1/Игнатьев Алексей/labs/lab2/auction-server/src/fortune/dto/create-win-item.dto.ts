import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWinItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'ID предмета' })
  spin_item_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'ID пользователя' })
  user_id: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @ApiProperty({ description: 'Получено' })
  is_received: boolean;
}

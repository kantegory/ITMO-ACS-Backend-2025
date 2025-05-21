import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateParticipantDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({ description: 'ID аукциона' })
  auction_id: number;
}

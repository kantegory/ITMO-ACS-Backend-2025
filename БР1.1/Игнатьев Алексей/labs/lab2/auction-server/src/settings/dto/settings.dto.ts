import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateSettingsDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  cost: number;
}

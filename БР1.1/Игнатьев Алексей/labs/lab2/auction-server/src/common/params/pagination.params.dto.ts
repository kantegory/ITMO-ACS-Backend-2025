import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginateParams {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty()
  skip?: number; // Для пагинации (сколько пропустить)

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty()
  take?: number; // Для пагинации (сколько взять)
}

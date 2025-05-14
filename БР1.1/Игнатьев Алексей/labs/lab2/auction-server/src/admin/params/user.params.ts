import { IsBoolean, IsEnum, IsInt } from 'class-validator';
import { AuctionType } from '@prisma/client';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
export class UserParams extends PaginateParams {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Имя' })
  first_name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Фамилия' })
  last_name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Email' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Имя пользователя' })
  username?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @ApiPropertyOptional({ description: 'Бот', default: false })
  is_bot?: boolean;
}

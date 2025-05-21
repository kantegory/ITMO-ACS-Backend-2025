import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  ValidateNested,
  IsString,
  IsInt,
  IsBoolean,
} from 'class-validator';

class UpdateAddressDto {
  @ApiPropertyOptional({ description: 'Страна' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Город' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'Улица' })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional({ description: 'Номер дома' })
  @IsOptional()
  @IsString()
  house_number?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Аватар',
    type: 'string',
    format: 'binary',
    nullable: true,
    required: false,
  })
  @IsOptional()
  avatar?: any;

  @ApiPropertyOptional({ description: 'Имя пользователя' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ description: 'Язык' })
  @IsOptional()
  @IsString()
  language: string;

  @ApiPropertyOptional({ description: 'Instagram' })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({ description: 'Номер телефона' })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiPropertyOptional({ description: 'Получать промо-рассылки' })
  @IsBoolean()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsOptional()
  mail_promo?: boolean;

  @ApiPropertyOptional({ description: 'Получать результаты аукционов' })
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  @IsOptional()
  mail_rate_result?: boolean;

  @ApiPropertyOptional({ description: 'Получать новые аукционы' })
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  @IsOptional()
  mail_new_auctions?: boolean;

  @ApiPropertyOptional({ description: 'Имя' })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({ description: 'Фамилия' })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({ description: 'Email' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'Адрес', type: () => UpdateAddressDto })
  @IsOptional()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}

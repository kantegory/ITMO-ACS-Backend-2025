import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RefInfoDto {
  @IsString()
  @ApiProperty({ description: 'Код реферала' })
  referral_code: string;
  @IsNumber()
  @ApiProperty({ description: 'Всего рефералов' })
  total_referrals: number;
  @IsNumber()
  @ApiProperty({ description: 'Активных рефералов' })
  active_referrals: number;
}

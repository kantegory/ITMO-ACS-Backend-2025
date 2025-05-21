import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CheckReferralCodeResponseDto {
  @IsBoolean()
  @ApiProperty({ description: 'Правильный код' })
  is_correct: boolean;
}

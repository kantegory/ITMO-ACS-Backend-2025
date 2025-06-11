import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateInvoiceDto {
  @ApiProperty({ description: 'Сумма' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'URL перенаправления' })
  @IsNotEmpty()
  @IsString()
  redirect_url: string;
}
export class CreateInvoiceCallbackDto {
  @ApiProperty({ description: 'ID счета' })
  @IsNotEmpty()
  @IsString()
  invoice_id: string;

  @ApiProperty({ description: 'Состояние' })
  @IsNotEmpty()
  @IsNumber()
  state: number;

  @ApiProperty({ description: 'Новая сумма' })
  @IsNotEmpty()
  @IsNumber()
  new_amount: number;

  @ApiProperty({ description: 'ID операции', required: false })
  @IsOptional()
  @IsNumber()
  operation_id?: number;

  @ApiProperty({ description: 'Состояние обращения' })
  @IsNotEmpty()
  @IsNumber()
  appeal_state: number;

  @ApiProperty({ description: 'Причина обращения', required: false })
  @IsOptional()
  @IsString()
  appeal_reason?: string;
}

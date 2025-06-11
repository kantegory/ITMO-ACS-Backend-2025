import { $Enums, Transaction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class TransactionEntity implements Transaction {
  @ApiProperty({ description: 'ID транзакции' })
  transaction_id: number;
  @ApiProperty({ description: 'ID платежа', required: false, type: String })
  payment_id: string | null;
  @ApiProperty({ description: 'Сумма', type: Number })
  amount: number;
  @ApiProperty({ description: 'Дата создания', type: Date })
  created_at: Date;
  @ApiProperty({ description: 'ID пользователя', type: Number })
  user_id: number;
  @ApiProperty({ description: 'Статус платежа', enum: $Enums.PaymentStatus })
  status: $Enums.PaymentStatus;
  @ApiProperty({ description: 'Метод платежа', enum: $Enums.PaymentMethod })
  method: $Enums.PaymentMethod;
  @ApiProperty({ description: 'Сумма в рублях', required: false, type: Number })
  rato_amount: number | null;
  @ApiProperty({ description: 'Валюта', required: false, type: String })
  currency: string | null;
  @ApiProperty({ description: 'Курс валюты', required: false, type: Number })
  exchange_rate: number | null;
  @ApiProperty({
    description: 'Дата истечения срока действия',
    required: false,
    type: Date,
  })
  expired_at: Date | null;
  @ApiProperty({ required: false, type: String })
  url?: string;
}

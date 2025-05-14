import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentMethod, PrismaClient, PaymentStatus } from '@prisma/client';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { AvrMoneyService } from 'src/config/avrMoney/avrMoney.service';
import { TransactionEntity } from './entities/transaction.entity';
import { ConfigService } from '@nestjs/config';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class PaymentsService {
  invoiceUrl: string;
  constructor(
    private prisma: PrismaClient,
    private readonly avrMoneyService: AvrMoneyService,
    private readonly notificationService: NotificationsService,
    private configService: ConfigService,
  ) {
    this.invoiceUrl = this.configService.get<string>('AVRMONEY_INVOICE_URL')!;
  }
  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
    userId: number,
  ): Promise<TransactionEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findFirst({
        where: { user_id: userId },
        include: { invited_by: true }, // Проверяем, есть ли реферер
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      let exchangeRate = 1; // Обычный курс без скидки

      // Если у пользователя есть реферер, проверяем, было ли успешное пополнение
      const hasSuccessfulTopUp = await tx.transaction.findFirst({
        where: { user_id: userId, status: PaymentStatus.COMPLETED },
      });

      // Если успешного пополнения нет — применяем скидку 10%
      if (!hasSuccessfulTopUp) {
        exchangeRate = 0.9; // 90$ = 100 RATO
      }

      // Создаём инвойс через платежный сервис
      const invoice = await this.avrMoneyService.createInvoice(
        createInvoiceDto.amount * exchangeRate, // С учетом скидки
        createInvoiceDto.redirect_url,
      );

      if (!invoice) {
        throw new BadRequestException('Invoice not created');
      }

      // Создаем транзакцию
      const transaction = await tx.transaction.create({
        data: {
          amount: createInvoiceDto.amount * exchangeRate,
          payment_id: invoice.id,
          user_id: userId,
          exchange_rate: exchangeRate,
          rato_amount: createInvoiceDto.amount,
          method: PaymentMethod.CARD,
          status: PaymentStatus.CREATED,
        },
      });

      // Уведомление о пополнении

      // Если у пользователя есть реферер, начисляем 10% бонуса

      return { ...transaction, url: `${this.invoiceUrl}/${invoice.id}` };
    });
  }
  async createInvoiceCallback(paymentId: string): Promise<StatusOKDto> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { payment_id: paymentId },
    });
    if (transaction) {
      await this.prisma.$transaction(async (tx) => {
        await tx.transaction.update({
          where: { transaction_id: transaction.transaction_id },
          data: { status: PaymentStatus.COMPLETED },
        });
        await tx.user.update({
          where: { user_id: transaction.user_id },
          data: { rato_balance: transaction.amount },
        });
        const user = await tx.user.findFirst({
          where: { user_id: transaction.user_id },
          include: { invited_by: true },
        });
        if (!user) {
          throw new BadRequestException('User not found');
        }
        if (user.invited_by) {
          const bonusAmount = transaction.amount * 0.1; // 10% бонус рефереру
          await tx.user.update({
            where: { user_id: user.invited_by.referred_by },
            data: { rato_balance: { increment: bonusAmount } },
          });

          // Создаем уведомление для пригласившего пользователя
          await this.notificationService.create(
            {
              type: 'REFERRAL_BALANCE_UPDATE',
              message: `You received ${bonusAmount} RATO from your referral's top-up!`,
            },
            user.invited_by.referred_by,
          );
          await this.notificationService.create(
            {
              type: 'BALANCE_UPDATE',
              message: `Your balance replenished by ${transaction.amount} RATO`,
            },
            transaction.user_id,
          );
        }
      });
      return new StatusOKDto();
    }
    throw new BadRequestException('Transaction not found');
  }
}

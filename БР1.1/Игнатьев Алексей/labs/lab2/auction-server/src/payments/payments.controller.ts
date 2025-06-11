import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiHeader, ApiSecurity } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { TransactionEntity } from './entities/transaction.entity';
import {
  CreateInvoiceCallbackDto,
  CreateInvoiceDto,
} from './dto/create-invoice.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Post('create-invoice')
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Request() req: { user: JwtUserPayloadDto },
  ): Promise<TransactionEntity> {
    return await this.paymentsService.createInvoice(
      createInvoiceDto,
      req.user.id,
    );
  }

  @Post('create-invoice-callback')
  async createInvoiceCallback(
    @Body() createInvoiceCallbackDto: CreateInvoiceCallbackDto,
  ): Promise<StatusOKDto> {
    console.log(createInvoiceCallbackDto);
    return await this.paymentsService.createInvoiceCallback(
      createInvoiceCallbackDto.invoice_id,
    );
  }
}

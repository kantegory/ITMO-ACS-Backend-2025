import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import crypto from 'crypto';
import { InvoiceDto } from './dto/invoice.dto';

@Injectable()
export class AvrMoneyService {
  apiRoot: string;
  apiKey: string;
  apiSecret: string;
  createInvoiceUrl = 'api/v1/s2s/invoices/create/';
  shopId: string;
  pair = 'USDT-RUB';
  redirectUrl: string;

  constructor(private configService: ConfigService) {
    this.apiRoot =
      this.configService.get<string>('AVRMONEY_API_ROOT') ?? 'some.com';
    this.apiKey = this.configService.get<string>('AVRMONEY_API_KEY') ?? 'KEY';
    this.redirectUrl =
      this.configService.get<string>('AVR_API_REDIRECT_URL') ?? 'some.com';
    this.apiSecret =
      this.configService.get<string>('AVRMONEY_SECRET_KEY') ?? 'SECRET';
    this.shopId = this.configService.get<string>('AVRMONEY_SHOP_ID') ?? 'id';
  }

  private async generateHeaders() {
    const nonce = Date.now();
    const message = this.apiKey + nonce;
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(message)
      .digest('hex');

    return {
      APIKEY: this.apiKey,
      SIGNATURE: signature,
      NONCE: nonce,
      'Content-Type': 'application/json',
    };
  }

  async createInvoice(
    amount: number,
    redirectUrl: string,
  ): Promise<InvoiceDto> {
    const res = await axios.post(
      `${this.apiRoot}/${this.createInvoiceUrl}`,
      {
        shop: this.shopId,
        pair: this.pair,
        amount: amount,
        redirect_url: redirectUrl,
      },
      { headers: await this.generateHeaders() },
    );
    if (res.status != 201) throw new BadRequestException('Payment error');
    return res.data;
  }
}

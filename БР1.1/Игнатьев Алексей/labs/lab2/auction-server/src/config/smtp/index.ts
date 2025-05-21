import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SMTPConfig implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions(): MailerOptions {
    const username = this.configService.get<string>('EMAIL_USER');
    const email = this.configService.get<string>('EMAIL');
    const password = this.configService.get<string>('EMAIL_PASSWORD');
    const host = this.configService.get<string>('EMAIL_HOST');
    return {
      transport: {
        host,
        pool: true,
        secure: false,
        port: 587,
        auth: {
          user: email,
          pass: password,
        },
        tls: { rejectUnauthorized: false },
        debug: true,
        logger: true,
      },

      defaults: {
        from: `Royal Auction <${this.configService.get<string>('EMAIL')}>`,
      },
    };
  }
}

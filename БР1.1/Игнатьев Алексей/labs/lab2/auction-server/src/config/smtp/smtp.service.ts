import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmtpService {
  constructor(
    private readonly smtpService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async registrationMessage(userEmail: string) {
    console.log('send');
    await this.smtpService.sendMail({
      to: userEmail,
      from: this.configService.get<string>('EMAIL'),
      subject: 'Registration',
      text: 'Registration message',
    });
  }

  public async resetPasswordMessage(userEmail: string, link: string) {
    await this.smtpService.sendMail({
      to: userEmail,
      from: this.configService.get<string>('EMAIL'),
      subject: 'Reset password ',
      text: `Reset password link: ${link}`,
    });
  }

  public async mailConfirmationMessage(userEmail: string, code: number) {
    await this.smtpService.sendMail({
      to: userEmail,
      from: this.configService.get<string>('EMAIL'),
      subject: 'Mail confirmation',
      text: `Mail confirmation code: ${code}`,
    });
  }
}

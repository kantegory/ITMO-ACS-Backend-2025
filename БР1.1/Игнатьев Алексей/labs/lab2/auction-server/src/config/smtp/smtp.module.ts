import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { SmtpConsumer } from './smtp.consumer';

@Module({
  providers: [SmtpService, SmtpConsumer],
  exports: [SmtpService, SmtpConsumer],
})
export class SmtpModule {}

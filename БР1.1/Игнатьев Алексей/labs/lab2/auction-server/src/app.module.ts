import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { StorageService } from './config/s3/s3.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullConfig, SMTPConfig } from './config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { RedisModule } from './config/redis/redis.module';
import { SmtpModule } from './config/smtp/smtp.module';
import { AuctionsModule } from './auctions/auctions.module';
import { PaymentsModule } from './payments/payments.module';
import { AvrMoneyModule } from './config/avrMoney/avrMoney.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PusherConfig } from './config/pusher/pusher.config';
import { PusherModule } from './config/pusher/pusher.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { NewsModule } from './news/news.module';
import { FaqModule } from './faq/faq.module';
import { ReferralsModule } from './referrals/referrals.module';
import { FortuneModule } from './fortune/fortune.module';
import { SettingsModule } from './settings/settings.module';
import { RatoTasksModule } from './rato-tasks/rato-tasks.module';
import { UserTasksModule } from './user-tasks/user-tasks.module';
import { BotsModule } from './bots/bots.module';

@Module({
  imports: [
    MailerModule.forRootAsync({ useClass: SMTPConfig }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [PusherConfig],
    }),
    BullModule.forRootAsync({
      useClass: BullConfig,
    }),
    PusherModule,
    UsersModule,
    SmtpModule,
    RedisModule,
    AuthModule,
    AuctionsModule,
    PaymentsModule,
    AvrMoneyModule,
    ReviewsModule,
    NotificationsModule,
    AdminModule,
    NewsModule,
    FaqModule,
    ReferralsModule,
    FortuneModule,
    SettingsModule,
    RatoTasksModule,
    UserTasksModule,
    BotsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaClient, StorageService],
})
export class AppModule {}

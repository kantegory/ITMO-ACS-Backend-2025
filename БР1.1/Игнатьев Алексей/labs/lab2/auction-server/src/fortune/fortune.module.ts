import { Module } from '@nestjs/common';
import { FortuneService } from './fortune.service';
import { FortuneController } from './fortune.controller';
import { PrismaClient } from '@prisma/client';
import { StorageModule } from 'src/config/s3/s3.module';
import { FortuneWinsController } from './fortune-wins.controller';
import { FortuneWinsService } from './fortune-wins.service';
import { AuthModule } from 'src/auth/auth.module';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';

@Module({
  imports: [StorageModule, AuthModule],
  controllers: [FortuneController, FortuneWinsController],
  providers: [
    FortuneService,
    FortuneWinsService,
    BasicAuthGuard,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
})
export class FortuneModule {}

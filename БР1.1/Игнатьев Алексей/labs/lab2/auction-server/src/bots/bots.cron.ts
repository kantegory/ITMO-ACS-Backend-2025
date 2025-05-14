import { Injectable, OnModuleInit } from '@nestjs/common';
import { BotRunnerService } from './bots.runner';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class BotCronService implements OnModuleInit {
  constructor(
    private readonly botRunner: BotRunnerService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit() {
    const botRunner = new CronJob(
      CronExpression.EVERY_10_SECONDS,
      async () => {
        await this.botRunner.startRunner();
        await this.botRunner.middleRunner();
        await this.botRunner.finalRunner();
        await this.botRunner.crisisRunner();
        await this.botRunner.fictionalRunner();
        await this.botRunner.testRunner();
      },
    );

    this.schedulerRegistry.addCronJob('bot-runner', botRunner);
    botRunner.start();
  }
}

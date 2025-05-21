import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PusherConfig } from './pusher.config';
import { PusherService } from './pusher.service';

@Module({
  imports: [ConfigModule.forFeature(PusherConfig)],
  providers: [PusherService],
  exports: [PusherService],
})
export class PusherModule {}

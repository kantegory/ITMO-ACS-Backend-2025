import { Injectable, Inject } from '@nestjs/common';
import Pusher from 'pusher';
import { ConfigType } from '@nestjs/config';
import { PusherConfig } from './pusher.config';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor(
    @Inject(PusherConfig.KEY) private config: ConfigType<typeof PusherConfig>,
  ) {
    this.pusher = new Pusher({
      appId: config.appId!,
      key: config.key!,
      secret: config.secret!,
      cluster: config.cluster!,
      useTLS: config.useTLS!,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    return this.pusher.trigger(channel, event, data);
  }
}

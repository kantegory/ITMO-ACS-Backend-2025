import { registerAs } from '@nestjs/config';

export const PusherConfig = registerAs('pusher', () => ({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
}));

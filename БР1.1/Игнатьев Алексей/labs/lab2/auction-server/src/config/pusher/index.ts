export const pusherOptions = {
  key: process.env.PUSHER_APP_KEY,
  appId: process.env.PUSHER_APP_ID,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
};
console.log(pusherOptions);

export const chunkingOption = {
  limit: 4000,
  enabled: true,
};

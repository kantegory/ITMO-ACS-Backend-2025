import amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    channel = await connection.createChannel();
    await channel.assertQueue('user_logged_in');
    console.log('✅ Connected to RabbitMQ');
  } catch (error) {
    console.error('❌ Failed to connect to RabbitMQ', error);
    throw error;
  }
}

export function sendUserLoggedInMessage(payload: any) {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  channel.sendToQueue('user_logged_in', Buffer.from(JSON.stringify(payload)));
}

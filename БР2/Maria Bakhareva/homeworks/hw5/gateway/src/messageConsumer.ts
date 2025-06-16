import amqp from 'amqplib';

export async function startConsuming() {
  const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
  const channel = await connection.createChannel();
  await channel.assertQueue('user_logged_in');

  channel.consume('user_logged_in', (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log('User logged in:', data);
      channel.ack(msg);
    }
  });
}

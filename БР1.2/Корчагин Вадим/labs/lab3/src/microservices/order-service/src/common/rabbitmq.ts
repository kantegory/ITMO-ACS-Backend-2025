import amqp from "amqplib";

let channel: amqp.Channel;

export const connectToRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://rabbitmq:5672");
  channel = await connection.createChannel();
  console.log("✅ [order] Connected to RabbitMQ");
};

export const sendOrderCreated = async (order: { userId: string }) => {
  const queue = "order_created";
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
};
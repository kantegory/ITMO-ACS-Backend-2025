import amqp from "amqplib";
import { UserProgressService } from "../services/userProgressService";

let channel: amqp.Channel;

export const connectToRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://rabbitmq:5672");
  channel = await connection.createChannel();
  console.log("✅ [progress] Connected to RabbitMQ");

  const queue = "order_created";
  await channel.assertQueue(queue, { durable: false });

  channel.consume(queue, async (msg) => {
    if (msg) {
      const content = JSON.parse(msg.content.toString());
      const progressService = new UserProgressService();
      await progressService.createFromOrder(content);
      channel.ack(msg);
    }
  });
};
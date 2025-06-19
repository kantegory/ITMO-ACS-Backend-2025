import * as amqp from "amqplib";
import { userRepository } from "../repositories/user.repository";

export const consumeEvents = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL!);
    const channel = await connection.createChannel();
    const exchange = "fitness_app_events";
    await channel.assertExchange(exchange, "fanout", { durable: false });
    const q = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(q.queue, exchange, "");
    channel.consume(q.queue, async (msg) => {
      if (msg) {
        const { event, message } = JSON.parse(msg.content.toString());
        if (event === "new_post_created") {
          console.log(`User Service: New post created by user ${message.user_id}`);
          // Например, обновить статистику активности пользователя
        }
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error consuming RabbitMQ events:", error);
  }
};
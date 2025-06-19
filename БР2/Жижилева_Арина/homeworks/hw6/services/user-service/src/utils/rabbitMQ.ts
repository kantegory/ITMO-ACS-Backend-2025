import * as amqp from "amqplib";

export const publishEvent = async (event: string, message: any) => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL!);
    const channel = await connection.createChannel();
    const exchange = "fitness_app_events";
    await channel.assertExchange(exchange, "fanout", { durable: false });
    const payload = JSON.stringify({ event, message });
    channel.publish(exchange, "", Buffer.from(payload));
    console.log(`Published event: ${event} with payload: ${payload}`);
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error("Error publishing to RabbitMQ:", error.message);
  }
};
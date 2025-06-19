import * as amqp from "amqplib";

export const publishEvent = async (event: string, message: any) => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL!);
    const channel = await connection.createChannel();
    const exchange = "fitness_app_events";
    await channel.assertExchange(exchange, "fanout", { durable: false });
    channel.publish(exchange, "", Buffer.from(JSON.stringify({ event, message })));
    console.log(`Published event: ${event}`);
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error("Error publishing to RabbitMQ:", error);
  }
};
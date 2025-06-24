import * as amqp from "amqplib";

async function testRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queue = "test_queue";

    await channel.assertQueue(queue, { durable: false });
    const message = "Hello, RabbitMQ!";
    channel.sendToQueue(queue, Buffer.from(message));
    console.log("Sent:", message);

    channel.consume(queue, (msg) => {
      if (msg) {
        console.log("Received:", msg.content.toString());
        channel.ack(msg);
      }
    });

    setTimeout(() => connection.close(), 1000);
  } catch (error) {
    console.error("Error:", error);
  }
}

testRabbitMQ();
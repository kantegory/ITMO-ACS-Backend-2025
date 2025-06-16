import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import amqp from 'amqplib';

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://localhost:3001';
const PROPERTIES_SERVICE_URL = process.env.PROPERTIES_SERVICE_URL || 'http://localhost:3002';
const CHATS_SERVICE_URL = process.env.CHATS_SERVICE_URL || 'http://localhost:3003';

app.get('/', (_req, res) => {
  res.send('API Gateway is running');
});

app.use('/api/users', createProxyMiddleware({
  target: USERS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/users': '/api/users' },
}));

app.use('/api/properties', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/properties/' },
}));

app.use('/api/favorites', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/favorites/' },
}));

app.use('/api/booking-requests', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/booking-requests/' },
}));

app.use('/api/complaints', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/complaints/' },
}));

app.use('/api/property-images', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/property-images/' },
}));

app.use('/api/chats', createProxyMiddleware({
  target: CHATS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/chats/' },
}));

async function startRabbitMQConsumerWithRetry(retries = 5, delay = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔁 Attempt ${attempt} to connect to RabbitMQ...`);
      const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
      const channel = await connection.createChannel();

      const queue = 'user_logged_in';
      await channel.assertQueue(queue, { durable: true });

      console.log(`🐇 Gateway is waiting for messages in queue: ${queue}`);

      channel.consume(queue, (msg) => {
        if (msg !== null) {
          const content = msg.content.toString();
          try {
            const data = JSON.parse(content);
            console.log('📩 Received user_logged_in event:', data);
          } catch (err) {
            console.error('❌ Failed to parse message content:', err);
          }
          channel.ack(msg);
        }
      });

      return; // успешное подключение - выходим из retry цикла
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`❌ Failed to connect to RabbitMQ (attempt ${attempt}): ${message}`);

      if (attempt < retries) {
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('❌ All attempts to connect to RabbitMQ failed. Exiting.');
        process.exit(1);
      }
    }
  }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
  startRabbitMQConsumerWithRetry();
});

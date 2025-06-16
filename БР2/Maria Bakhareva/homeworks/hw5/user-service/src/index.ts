import { AppDataSource } from './config/databaseConfig';
import app from './app';
import { connectRabbitMQ } from './messageBroker';

const PORT = process.env.PORT || 3000;

async function retryRabbitMQ(retries = 5, delay = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔁 Attempt ${attempt} to connect to RabbitMQ...`);
      await connectRabbitMQ();
      console.log('✅ Successfully connected to RabbitMQ');
      return;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`❌ RabbitMQ connection failed (attempt ${attempt}): ${message}`);

      if (attempt < retries) {
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw new Error('❌ All attempts to connect to RabbitMQ failed.');
      }
    }
  }
}

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log('🗄️  Data Source has been initialized!');

    await retryRabbitMQ();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error during initialization', err);
    process.exit(1);
  }
}

startServer();

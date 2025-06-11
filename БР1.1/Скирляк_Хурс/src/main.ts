import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import dataSource from './data-source';

async function bootstrap() {
  await dataSource.initialize();

  // 2) run any pending migrations
  await dataSource.runMigrations();
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  const cs = app.get(ConfigService);
  const rmq = cs.get<{ uri: string; queues: Record<string, string> }>(
    'rabbitmq',
  );

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger setup
  const docCfg = new DocumentBuilder()
    .setTitle('MovieMatch API')
    .setDescription('The MovieMatch API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docCfg);
  SwaggerModule.setup(cs.get<string>('SWAGGER_PATH') || 'api', app, document);

  // RabbitMQ listeners
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmq.uri],
      queue: rmq.queues.userService,
      queueOptions: { durable: true },
    },
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmq.uri],
      queue: rmq.queues.authService,
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  const port = cs.get<number>('PORT') || Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`Movie Matching Service is running on port ${port}`);
  console.log(
    `Application is running on: http://localhost:${port}${cs.get<string>('API_PREFIX')}`,
  );
}

bootstrap();

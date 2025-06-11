import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { MovieDataModule } from './movie-data.module';

async function bootstrap() {
  const app = await NestFactory.create(MovieDataModule);
  const cs = app.get(ConfigService);
  const rmq = cs.get<{ uri: string; queues: Record<string, string> }>(
    'rabbitmq',
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmq.uri],
      queue: rmq.queues.movieDataService,
      queueOptions: { durable: true },
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerCfg = new DocumentBuilder()
    .setTitle('Movie Data Service')
    .setDescription('Movie Data API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup(cs.get<string>('SWAGGER_PATH') || 'api', app, document);

  await app.startAllMicroservices();
  const port = cs.get<number>('PORT') || Number(process.env.PORT) || 3004;
  await app.listen(port);
}

bootstrap();

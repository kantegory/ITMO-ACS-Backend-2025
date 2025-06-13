import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Job Board API Gateway')
      .setDescription('API documentation for microservices via gateway')
      .setVersion('1.0')
      .addTag('user', 'User & Resume Service')
      .addTag('company', 'Company & Vacancy Service')
      .addTag('industry', 'Industry Service')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
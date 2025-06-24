import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS (если нужно)
  app.enableCors();

  // Устанавливаем глобальный префикс для всех маршрутов
  app.setGlobalPrefix('api');

  // Настройка Swagger
  const config = new DocumentBuilder()
      .setTitle('API Documentation') // Название API
      .setDescription('API для вашего приложения') // Описание API
      .setVersion('1.0') // Версия API
      .addBearerAuth() // Добавляем поддержку JWT
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Путь к Swagger UI: /api/docs

  // Запускаем приложение на порту из переменной окружения или используем порт 4200 по умолчанию
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
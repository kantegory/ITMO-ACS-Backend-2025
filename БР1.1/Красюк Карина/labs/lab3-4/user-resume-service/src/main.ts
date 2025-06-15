import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());


    const config = new DocumentBuilder()
        .setTitle('User and Resume Service')
        .setDescription('API documentation for managing users and resumes')
        .setVersion('1.0')
        .addTag('user', 'User Management')
        .addTag('resume', 'Resume Management')
        .addTag('application', 'Job Applications')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(3001);
}
bootstrap();
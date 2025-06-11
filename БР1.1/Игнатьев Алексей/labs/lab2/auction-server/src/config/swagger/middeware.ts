import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key']; // 🔐 Ключ из заголовка
    const validKey = process.env.SWAGGER_API_KEY || 'my-secret-key'; // 🔑 Храним в .env

    if (apiKey !== validKey) {
      throw new ForbiddenException('Invalid API Key');
    }
    next();
  }
}

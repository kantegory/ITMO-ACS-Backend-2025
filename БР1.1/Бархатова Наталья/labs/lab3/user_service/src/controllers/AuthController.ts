import {
  JsonController,
  Post,
  Body,
  BadRequestError,
  HttpCode
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { AppDataSource } from '../AppDataSource';
import { User } from '../models/User';
import { UserDetails } from '../models/UserDetails';
import { AuthClient } from '../services/AuthClient';

@JsonController('/users')
export class AuthController {
  private userRepository = AppDataSource.getRepository(User);
  private authClient = new AuthClient();

  @Post('/register')
  @HttpCode(201)
  @OpenAPI({
    summary: 'Регистрация пользователя',
    description: 'Создает нового пользователя (username, details) и регистрирует его в auth-сервисе.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'user@example.com' },
              password: { type: 'string', example: 'strongPassword123' },
              username: { type: 'string', example: 'user123' },
              details: {
                type: 'object',
                properties: {
                  age: { type: 'integer', example: 30 },
                  gender: { type: 'string', enum: ['male', 'female', 'unspecified'], example: 'male' },
                  weight: { type: 'number', example: 75.5 },
                  height: { type: 'number', example: 180 }
                }
              }
            },
            required: ['email', 'password', 'username', 'details']
          }
        }
      }
    },
    responses: {
      201: { description: 'Пользователь создан, токен возвращен.' },
      400: { description: 'Ошибка регистрации.' }
    }
  })
  async register(
    @Body() userData: {
      email: string;
      password: string;
      username: string;
      details: Partial<UserDetails>;
    }
  ) {
    const { email, password, username, details } = userData;

    let token: string;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestError('User already exists');
    }
    const hashedPassword = await this.authClient.hashPassword(password);
    try {
      const response = await this.authClient.getToken({ email, password: hashedPassword });
      token = response.token;
    } catch (e) {
      const error = e as Error;
      throw new BadRequestError('Auth service login failed: ' + error.message);
    }

    const user = this.userRepository.create({ email, password: hashedPassword, username, details });
    await this.userRepository.save(user);
    return { token };
  }

  @Post('/login')
  @HttpCode(200)
  @OpenAPI({
    summary: 'Логин пользователя',
    description: 'Проксирует логин в auth-сервис, возвращает токен.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              password: { type: 'string' }
            },
            required: ['email', 'password']
          }
        }
      }
    },
    responses: {
      200: { description: 'Токен получен.' },
      400: { description: 'Неверные данные.' }
    }
  })
  async login(
    @Body() loginData: { email: string; password: string }
  ) {
    const { email, password } = loginData;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const isValidPassword = await this.authClient.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError('Invalid credentials');
    }

    try {
      const response = await this.authClient.getToken({ email, password });
      return { token: response.token };
    } catch (e) {
      const error = e as Error;
      throw new BadRequestError('Auth service login failed: ' + error.message);
    }
  }
}

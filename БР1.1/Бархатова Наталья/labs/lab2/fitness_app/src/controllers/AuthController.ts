import {
  JsonController,
  Post,
  Body,
  BadRequestError,
  HttpCode
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { User } from '../models/User';
import { UserDetails } from '../models/UserDetails';
import { AppDataSource } from '../AppDataSource';
import { AuthService } from '../services/AuthService';

@JsonController('/auth')
export class AuthController {
  private userRepository = AppDataSource.getRepository(User);
  private userDetailsRepository = AppDataSource.getRepository(UserDetails);
  private authService = new AuthService();

  @Post('/register')
  @HttpCode(201)
  @OpenAPI({
    summary: "Регистрация пользователя",
    description: "Создает нового пользователя с деталями и возвращает JWT токен.",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", example: "user@example.com" },
              password: { type: "string", example: "strongPassword123" },
              username: { type: "string", example: "user123" },
              details: {
                type: "object",
                required: ["age", "gender", "weight", "height"],
                properties: {
                  age: { type: "integer", example: 30 },
                  gender: { type: "string", enum: ["male", "female", "unspecified"], example: "male" },
                  weight: { type: "number", example: 75.5 },
                  height: { type: "number", example: 180 }
                }
              }
            },
            required: ["email", "password", "username", "details"]
          }
        }
      }
    },
    responses: {
      201: { description: "Пользователь успешно зарегистрирован, возвращает JWT токен." },
      400: { description: "Пользователь с таким email уже существует." }
    }
  })
  async register(
    @Body()
    userData: {
      email: string;
      password: string;
      username: string;
      details: Partial<UserDetails>;
    }
  ) {
    const { email, password, username, details } = userData;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    const hashedPassword = await this.authService.hashPassword(password);
    const userDetails = this.userDetailsRepository.create(details);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      username,
      details: userDetails
    });

    await this.userRepository.save(user);

    const token = this.authService.generateToken(user);
    return { token };
  }

  @Post('/login')
  @HttpCode(200)
  @OpenAPI({
    summary: "Авторизация пользователя",
    description: "Проверяет email и пароль, возвращает JWT токен при успешной аутентификации.",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", example: "user@example.com" },
              password: { type: "string", example: "strongPassword123" }
            },
            required: ["email", "password"]
          }
        }
      }
    },
    responses: {
      200: { description: "Успешный вход, возвращает JWT токен." },
      400: { description: "Неверные учетные данные." }
    }
  })
  async login(
    @Body()
    loginData: {
      email: string;
      password: string;
    }
  ) {
    const { email, password } = loginData;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['details', 'posts', 'progress', 'trainingPlans']
    });

    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const isPasswordValid = await this.authService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError('Invalid credentials');
    }

    const token = this.authService.generateToken(user);
    return { token };
  }
}

import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  QueryParam,
  HttpCode,
  UseBefore,
  OnUndefined
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { AppDataSource } from "../AppDataSource";
import { User } from "../models/User";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const userRepo = AppDataSource.getRepository(User);

@JsonController("/users")
@UseBefore(AuthMiddleware)
export class UserController {
  @Post()
  @HttpCode(201)
  @OpenAPI({
    summary: "Создать пользователя",
    description: "Создает нового пользователя с заданными данными",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "username", "password"],
            properties: {
              email: { type: "string", example: "user@example.com" },
              username: { type: "string", example: "user123" },
              password: { type: "string", example: "strongPassword123" }
            }
          }
        }
      }
    },
    responses: {
      201: { description: "Пользователь успешно создан" }
    }
  })
  async createUser(@Body() userData: Partial<User>) {
    const user = userRepo.create(userData);
    return await userRepo.save(user);
  }

  @Get()
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить всех пользователей",
    description: "Возвращает список всех пользователей",
    responses: {
      200: { description: "Список пользователей" }
    }
  })
  async getAllUsers() {
    return await userRepo.find();
  }

  @Get("/by-email")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить пользователя по email",
    description: "Возвращает пользователя с указанным email",
    parameters: [
      {
        name: "email",
        in: "query",
        description: "Email пользователя для поиска",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: { description: "Пользователь найден" },
      404: { description: "Пользователь не найден" }
    }
  })
  async getUserByEmail(@QueryParam("email") email: string) {
    if (!email) return undefined;
    return await userRepo.findOne({ where: { email } });
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить пользователя по ID",
    description: "Возвращает пользователя по его уникальному идентификатору",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID пользователя",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: { description: "Пользователь найден" },
      404: { description: "Пользователь не найден" }
    }
  })
  async getUserById(@Param("id") id: string) {
    return await userRepo.findOne({ where: { id } });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Обновить пользователя",
    description: "Обновляет данные пользователя по ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID пользователя для обновления",
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", example: "user@example.com" },
              username: { type: "string", example: "user123" },
              password: { type: "string", example: "newPassword123" }
            }
          }
        }
      }
    },
    responses: {
      200: { description: "Пользователь успешно обновлен" },
      404: { description: "Пользователь не найден" }
    }
  })
  async updateUser(@Param("id") id: string, @Body() updateData: Partial<User>) {
    const user = await userRepo.findOne({ where: { id } });
    if (!user) return undefined;
    userRepo.merge(user, updateData);
    return await userRepo.save(user);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  @OpenAPI({
    summary: "Удалить пользователя",
    description: "Удаляет пользователя по ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID пользователя для удаления",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      204: { description: "Пользователь успешно удален" },
      404: { description: "Пользователь не найден" }
    }
  })
  async deleteUser(@Param("id") id: string) {
    const result = await userRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseBefore,
  OnUndefined
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { AppDataSource } from "../AppDataSource";
import { UserDetails } from "../models/UserDetails";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const userDetailsRepo = AppDataSource.getRepository(UserDetails);

@JsonController("/userDetails")
@UseBefore(AuthMiddleware)
export class UserDetailsController {
  @Post()
  @HttpCode(201)
  @OpenAPI({
    summary: "Создать детали пользователя",
    description: "Создает запись с деталями пользователя",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["age", "gender", "weight", "height"],
            properties: {
              age: { type: "integer", example: 30 },
              gender: { type: "string", enum: ["male", "female", "unspecified"], example: "male" },
              weight: { type: "number", example: 75.5 },
              height: { type: "number", example: 180 }
            }
          }
        }
      }
    },
    responses: {
      201: { description: "Детали пользователя созданы" }
    }
  })
  async create(@Body() data: Partial<UserDetails>) {
    const entity = userDetailsRepo.create(data);
    return await userDetailsRepo.save(entity);
  }

  @Get()
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить все детали пользователей",
    description: "Возвращает список всех записей с деталями пользователей",
    responses: {
      200: { description: "Список деталей пользователей" }
    }
  })
  async getAll() {
    return await userDetailsRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить детали пользователя по ID",
    description: "Возвращает детали пользователя по уникальному идентификатору",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID деталей пользователя",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: { description: "Детали пользователя найдены" },
      404: { description: "Детали пользователя не найдены" }
    }
  })
  async getOne(@Param("id") id: string) {
    return await userDetailsRepo.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Обновить детали пользователя",
    description: "Обновляет детали пользователя по ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID деталей пользователя для обновления",
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
              age: { type: "integer", example: 31 },
              gender: { type: "string", enum: ["male", "female", "unspecified"], example: "female" },
              weight: { type: "number", example: 70.2 },
              height: { type: "number", example: 175 }
            }
          }
        }
      }
    },
    responses: {
      200: { description: "Детали пользователя обновлены" },
      404: { description: "Детали пользователя не найдены" }
    }
  })
  async update(@Param("id") id: string, @Body() data: Partial<UserDetails>) {
    const entity = await userDetailsRepo.findOne({ where: { id } });
    if (!entity) return undefined;
    userDetailsRepo.merge(entity, data);
    return await userDetailsRepo.save(entity);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  @OpenAPI({
    summary: "Удалить детали пользователя",
    description: "Удаляет детали пользователя по ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID деталей пользователя для удаления",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      204: { description: "Детали пользователя удалены" },
      404: { description: "Детали пользователя не найдены" }
    }
  })
  async delete(@Param("id") id: string) {
    const result = await userDetailsRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

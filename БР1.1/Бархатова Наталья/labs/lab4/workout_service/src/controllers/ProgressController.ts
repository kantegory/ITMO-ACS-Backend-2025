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
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Progress } from "../models/Progress";

const progressRepo = AppDataSource.getRepository(Progress);

@JsonController("/progresses")
@UseBefore(AuthMiddleware)
export class ProgressController {
  @Post()
  @HttpCode(201)
  @OpenAPI({
    summary: "Создать запись прогресса",
    description: "Создает новую запись прогресса пользователя",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["userId", "current_weight", "workout_minutes", "completed_workouts"],
            properties: {
              userId: { type: "string", example: "123e4567-e89b-12d3-a456-426614174000" },
              current_weight: { type: "number", example: 75.5 },
              workout_minutes: { type: "integer", example: 120 },
              completed_workouts: { type: "integer", example: 10 }
            }
          }
        }
      }
    },
    responses: {
      201: { description: "Прогресс успешно создан" }
    }
  })
  async create(@Body() progressData: Partial<Progress>) {
    const progress = progressRepo.create(progressData);
    return await progressRepo.save(progress);
  }

  @Get()
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить все записи прогресса",
    description: "Возвращает список всех записей прогресса",
    responses: {
      200: { description: "Список прогресса" }
    }
  })
  async getAll() {
    return await progressRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить запись прогресса по ID",
    description: "Возвращает запись прогресса с указанным ID, включая данные пользователя",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID записи прогресса",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: { description: "Запись найдена" },
      404: { description: "Запись не найдена" }
    }
  })
  async getOne(@Param("id") id: string) {
    return await progressRepo.findOne({
      where: { id }
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Обновить запись прогресса",
    description: "Обновляет запись прогресса по ID и возвращает обновленные данные",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID записи для обновления",
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
              current_weight: { type: "number", example: 74.0 },
              workout_minutes: { type: "integer", example: 150 },
              completed_workouts: { type: "integer", example: 12 }
            }
          }
        }
      }
    },
    responses: {
      200: { description: "Запись успешно обновлена" },
      404: { description: "Запись не найдена" }
    }
  })
  async update(@Param("id") id: string, @Body() data: Partial<Progress>) {
    const progress = await progressRepo.findOne({ where: { id } });
    if (!progress) return undefined;

    progressRepo.merge(progress, data);
    return await progressRepo.save(progress);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  @OpenAPI({
    summary: "Удалить запись прогресса",
    description: "Удаляет запись прогресса по ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID записи для удаления",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      204: { description: "Запись успешно удалена" },
      404: { description: "Запись не найдена" }
    }
  })
  async delete(@Param("id") id: string) {
    const result = await progressRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

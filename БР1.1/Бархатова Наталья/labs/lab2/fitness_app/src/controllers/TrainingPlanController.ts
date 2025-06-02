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
import { TrainingPlan } from "../models/TrainingPlan";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const trainingPlanRepo = AppDataSource.getRepository(TrainingPlan);

@JsonController("/training_plans")
@UseBefore(AuthMiddleware)
export class TrainingPlanController {
  @Post()
  @HttpCode(201)
  @OpenAPI({
    summary: "Создать тренировочный план",
    description: "Создает новый тренировочный план",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["userId", "workoutId", "scheduled_date", "difficulty_grade"],
            properties: {
              userId: { type: "string", example: "123e4567-e89b-12d3-a456-426614174000" },
              workoutId: { type: "string", example: "987e6543-e21b-12d3-a456-426614174000" },
              completed: { type: "boolean", example: false },
              scheduled_date: { type: "string", format: "date-time", example: "2025-05-27T12:00:00Z" },
              difficulty_grade: { type: "integer", example: 3 }
            }
          }
        }
      }
    },
    responses: {
      201: { description: "Тренировочный план создан" }
    }
  })
  async create(@Body() trainingPlanData: Partial<TrainingPlan>) {
    const trainingPlan = trainingPlanRepo.create(trainingPlanData);
    return await trainingPlanRepo.save(trainingPlan);
  }

  @Get()
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить все тренировочные планы",
    description: "Возвращает список всех тренировочных планов",
    responses: {
      200: { description: "Список тренировочных планов" }
    }
  })
  async getAll() {
    return await trainingPlanRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить тренировочный план по ID",
    description: "Возвращает тренировочный план с указанным ID, включая связанные пользователя и тренировку",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID тренировочного плана",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: { description: "Тренировочный план найден" },
      404: { description: "Тренировочный план не найден" }
    }
  })
  async getOne(@Param("id") id: string) {
    return await trainingPlanRepo.findOne({
      where: { id },
      relations: ["user", "workout"]
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Обновить тренировочный план",
    description: "Обновляет тренировочный план по ID и возвращает обновленные данные",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID тренировочного плана для обновления",
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
              userId: { type: "string", example: "123e4567-e89b-12d3-a456-426614174000" },
              workoutId: { type: "string", example: "987e6543-e21b-12d3-a456-426614174000" },
              completed: { type: "boolean", example: true },
              scheduled_date: { type: "string", format: "date-time", example: "2025-06-01T10:00:00Z" },
              difficulty_grade: { type: "integer", example: 4 }
            }
          }
        }
      }
    },
    responses: {
      200: { description: "Тренировочный план успешно обновлен" },
      404: { description: "Тренировочный план не найден" }
    }
  })
  async update(@Param("id") id: string, @Body() data: Partial<TrainingPlan>) {
    const trainingPlan = await trainingPlanRepo.findOne({ where: { id } });
    if (!trainingPlan) return undefined;

    trainingPlanRepo.merge(trainingPlan, data);
    return await trainingPlanRepo.save(trainingPlan);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  @OpenAPI({
    summary: "Удалить тренировочный план",
    description: "Удаляет тренировочный план по ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID тренировочного плана для удаления",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      204: { description: "Тренировочный план успешно удален" },
      404: { description: "Тренировочный план не найден" }
    }
  })
  async delete(@Param("id") id: string) {
    const result = await trainingPlanRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

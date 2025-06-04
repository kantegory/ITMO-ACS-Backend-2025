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
import { Workout } from "../models/Workout";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Level } from "../models/enums/Level"

const workoutRepo = AppDataSource.getRepository(Workout);

@JsonController("/workouts")
@UseBefore(AuthMiddleware)
export class WorkoutController {
  @Post()
  @HttpCode(201)
  @OpenAPI({
    summary: "Создать тренировку",
    description: "Создает новую тренировку с переданными данными",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["level", "workout_type", "duration", "description", "guide"],
            properties: {
              level: { type: "string", enum: Object.values(Level), example: Level.Easy },
              workout_type: { type: "string", example: "Strength" },
              duration: { type: "integer", example: 60 },
              video: { type: "string", example: "https://youtube.com/example", nullable: true },
              description: { type: "string", example: "Тренировка на развитие силы" },
              guide: { type: "string", example: "1. Разминка\n2. Основная часть\n3. Заминка" }
            }
          }
        }
      }
    },
    responses: {
      201: { description: "Тренировка успешно создана" }
    }
  })
  async create(@Body() data: Partial<Workout>) {
    const workout = workoutRepo.create(data);
    return await workoutRepo.save(workout);
  }

  @Get()
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить все тренировки",
    description: "Возвращает список всех тренировок",
    responses: {
      200: { description: "Список тренировок" }
    }
  })
  async getAll() {
    return await workoutRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить тренировку по ID",
    description: "Возвращает тренировку по уникальному идентификатору",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID тренировки",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: { description: "Тренировка найдена" },
      404: { description: "Тренировка не найдена" }
    }
  })
  async getOne(@Param("id") id: string) {
    return await workoutRepo.findOne({
      where: { id },
      relations: ["trainingPlans"],
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Обновить тренировку",
    description: "Обновляет данные тренировки по ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID тренировки для обновления",
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
              level: { type: "string", enum: Object.values(Level), example: Level.Easy },
              workout_type: { type: "string", example: "Strength" },
              duration: { type: "integer", example: 60 },
              video: { type: "string", example: "https://youtube.com/example", nullable: true },
              description: { type: "string", example: "Обновленное описание" },
              guide: { type: "string", example: "Обновленный гайд" }
            }
          }
        }
      }
    },
    responses: {
      200: { description: "Тренировка успешно обновлена" },
      404: { description: "Тренировка не найдена" }
    }
  })
  async update(@Param("id") id: string, @Body() data: Partial<Workout>) {
    const workout = await workoutRepo.findOne({ where: { id } });
    if (!workout) return undefined;
    workoutRepo.merge(workout, data);
    return await workoutRepo.save(workout);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  @OpenAPI({
    summary: "Удалить тренировку",
    description: "Удаляет тренировку по ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID тренировки для удаления",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      204: { description: "Тренировка успешно удалена" },
      404: { description: "Тренировка не найдена" }
    }
  })
  async delete(@Param("id") id: string) {
    const result = await workoutRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

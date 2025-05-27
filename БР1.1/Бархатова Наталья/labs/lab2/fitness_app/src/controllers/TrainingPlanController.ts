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
import { AppDataSource } from "../AppDataSource";
import { TrainingPlan } from "../models/TrainingPlan";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const trainingPlanRepo = AppDataSource.getRepository(TrainingPlan);

@JsonController("/training_plans")
@UseBefore(AuthMiddleware)
export class TrainingPlanController {
  @Post()
  @HttpCode(201)
  async create(@Body() trainingPlanData: Partial<TrainingPlan>) {
    const trainingPlan = trainingPlanRepo.create(trainingPlanData);
    return await trainingPlanRepo.save(trainingPlan);
  }

  @Get()
  @HttpCode(200)
  async getAll() {
    return await trainingPlanRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async getOne(@Param("id") id: string) {
    return await trainingPlanRepo.findOne({
      where: { id },
      relations: ["user", "workout"]
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() data: Partial<TrainingPlan>) {
    const trainingPlan = await trainingPlanRepo.findOne({ where: { id } });
    if (!trainingPlan) return undefined;

    trainingPlanRepo.merge(trainingPlan, data);
    return await trainingPlanRepo.save(trainingPlan);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const result = await trainingPlanRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

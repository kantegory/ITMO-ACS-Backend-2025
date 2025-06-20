import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseBefore
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
  async create(@Body() trainingPlanData: any) {
    const trainingPlan = trainingPlanRepo.create(trainingPlanData);
    return await trainingPlanRepo.save(trainingPlan);
  }

  @Get()
  async getAll() {
    return await trainingPlanRepo.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const trainingPlan = await trainingPlanRepo.findOne({
      where: { id },
      relations: ["user", "workout"],
    });

    if (!trainingPlan) {
      return { status: 404, message: "Training plan not found" };
    }

    return trainingPlan;
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: any) {
    const trainingPlan = await trainingPlanRepo.findOne({ where: { id } });
    if (!trainingPlan) {
      return { status: 404, message: "Training plan not found" };
    }

    trainingPlanRepo.merge(trainingPlan, data);
    return await trainingPlanRepo.save(trainingPlan);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await trainingPlanRepo.delete(id);
    if (result.affected === 0) {
      return { status: 404, message: "Training plan not found" };
    }

    return { message: "Training plan deleted successfully" };
  }
}

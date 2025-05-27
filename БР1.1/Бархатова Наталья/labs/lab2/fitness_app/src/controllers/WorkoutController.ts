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
import { Workout } from "../models/Workout";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const workoutRepo = AppDataSource.getRepository(Workout);

@JsonController("/workouts")
@UseBefore(AuthMiddleware)
export class WorkoutController {
  @Post()
  @HttpCode(201)
  async create(@Body() data: Partial<Workout>) {
    const workout = workoutRepo.create(data);
    return await workoutRepo.save(workout);
  }

  @Get()
  @HttpCode(200)
  async getAll() {
    return await workoutRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async getOne(@Param("id") id: string) {
    return await workoutRepo.findOne({
      where: { id },
      relations: ["trainingPlans"],
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() data: Partial<Workout>) {
    const workout = await workoutRepo.findOne({ where: { id } });
    if (!workout) return undefined;
    workoutRepo.merge(workout, data);
    return await workoutRepo.save(workout);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const result = await workoutRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

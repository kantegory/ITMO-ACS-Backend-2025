import { JsonController, Get, Post, Put, Delete, Param, Body, HttpCode, UseBefore} from "routing-controllers";
import { AppDataSource } from "../AppDataSource";
import { Workout } from "../models/Workout";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';


const workoutRepo = AppDataSource.getRepository(Workout);

@JsonController("/workouts")
@UseBefore(AuthMiddleware)

export class WorkoutController {
  @Post()
  @HttpCode(201)
  async create(@Body() workoutData: any) {
    const workout = workoutRepo.create(workoutData);
    return await workoutRepo.save(workout);
  }

  @Get()
  async getAll() {
    return await workoutRepo.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const workout = await workoutRepo.findOne({
      where: { id },
      relations: ["trainingPlans"],
    });

    if (!workout) {
      return { status: 404, message: "Workout not found" };
    }

    return workout;
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: any) {
    const workout = await workoutRepo.findOne({ where: { id } });
    if (!workout) {
      return { status: 404, message: "Workout not found" };
    }

    workoutRepo.merge(workout, data);
    return await workoutRepo.save(workout);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await workoutRepo.delete(id);
    if (result.affected === 0) {
      return { status: 404, message: "Workout not found" };
    }

    return { message: "Workout deleted successfully" };
  }
}

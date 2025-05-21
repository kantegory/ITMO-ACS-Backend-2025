import {
  Get, Post, Patch, Delete, Param, Body, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Workout } from "../entities/Workout";
import { CreateWorkoutDto } from "../dto/workout/create-workout.dto";
import { UpdateWorkoutDto } from "../dto/workout/update-workout.dto";
import { WorkoutResponseDto } from "../dto/workout/workout-response.dto";
import { WorkoutService } from "../services/workoutService";
import { BaseController } from "../common/baseController";

@JsonController("/workouts")
export class WorkoutController extends BaseController<Workout> {
  private readonly workoutService: WorkoutService;

  constructor() {
    super(new WorkoutService());
    this.workoutService = this.service as WorkoutService;
  }

  @Get("/")
  @OpenAPI({ summary: "Get all workouts" })
  @ResponseSchema(WorkoutResponseDto, { isArray: true })
  async getAll() {
    return this.workoutService.findAll();
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get workout by ID" })
  @ResponseSchema(WorkoutResponseDto)
  async getById(@Param("id") id: number) {
    const workout = await this.workoutService.findOne(id);
    if (!workout) {
      return { error: "Not found" };
    }
    return workout;
  }

  @Post("/")
  @OpenAPI({ summary: "Create a workout" })
  @ResponseSchema(WorkoutResponseDto)
  async create(@Body({ required: true }) data: CreateWorkoutDto) {
    return this.workoutService.create(data);
  }

  @Patch("/:id")
  @OpenAPI({ summary: "Update a workout" })
  @ResponseSchema(WorkoutResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) data: UpdateWorkoutDto) {
    const updated = await this.workoutService.update(id, data);
    if (!updated) {
      return { error: "Not found" };
    }
    return updated;
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete a workout" })
  async remove(@Param("id") id: number) {
    await this.workoutService.remove(id);
    return { message: "Deleted successfully" };
  }
}

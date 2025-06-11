import {
  Get, Post, Patch, Delete, Param, Body, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { TrainingPlanWorkout } from "../entities/TrainingPlanWorkout";
import { CreateTrainingPlanWorkoutDto } from "../dto/trainingPlanWorkout/create-training-plan-workout.dto";
import { UpdateTrainingPlanWorkoutDto } from "../dto/trainingPlanWorkout/update-training-plan-workout.dto";
import { TrainingPlanWorkoutResponseDto } from "../dto/trainingPlanWorkout/training-plan-workout-response.dto";
import { TrainingPlanWorkoutService } from "../services/trainingPlanWorkoutService";
import { BaseController } from "../common/baseController";

@JsonController("/training-plan-workouts")
export class TrainingPlanWorkoutController extends BaseController<TrainingPlanWorkout> {
  private readonly trainingPlanWorkoutService: TrainingPlanWorkoutService;

  constructor() {
    super(new TrainingPlanWorkoutService());
    this.trainingPlanWorkoutService = this.service as TrainingPlanWorkoutService;
  }

  @Get("/")
  @OpenAPI({ summary: "Get all training plan workouts" })
  @ResponseSchema(TrainingPlanWorkoutResponseDto, { isArray: true })
  async getAll() {
    return this.trainingPlanWorkoutService.findAllWithRelations();
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get a training plan workout by ID" })
  @ResponseSchema(TrainingPlanWorkoutResponseDto)
  async getById(@Param("id") id: number) {
    const item = await this.trainingPlanWorkoutService.findOneWithRelations(id);
    if (!item) {
      return { error: "Not found" };
    }
    return item;
  }

  @Post("/")
  @OpenAPI({ summary: "Create a training plan workout" })
  @ResponseSchema(TrainingPlanWorkoutResponseDto)
  async create(@Body({ required: true }) data: CreateTrainingPlanWorkoutDto) {
    return this.trainingPlanWorkoutService.create(data);
  }

  @Patch("/:id")
  @OpenAPI({ summary: "Update a training plan workout" })
  @ResponseSchema(TrainingPlanWorkoutResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) data: UpdateTrainingPlanWorkoutDto) {
    const updated = await this.trainingPlanWorkoutService.update(id, data);
    if (!updated) {
      return { error: "Not found" };
    }
    return updated;
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete a training plan workout" })
  async remove(@Param("id") id: number) {
    await this.trainingPlanWorkoutService.remove(id);
    return { message: "Deleted successfully" };
  }
}
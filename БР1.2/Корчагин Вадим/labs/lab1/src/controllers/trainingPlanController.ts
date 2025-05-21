import {
  Get, Post, Patch, Delete, Param, Body, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { TrainingPlan } from "../entities/TrainingPlan";
import { CreateTrainingPlanDto } from "../dto/trainingPlan/create-training-plan.dto";
import { UpdateTrainingPlanDto } from "../dto/trainingPlan/update-training-plan.dto";
import { TrainingPlanResponseDto } from "../dto/trainingPlan/training-plan-response.dto";
import { TrainingPlanService } from "../services/trainingPlanService";
import { BaseController } from "../common/baseController";

@JsonController("/training-plans")
export class TrainingPlanController extends BaseController<TrainingPlan> {
  private readonly trainingPlanService: TrainingPlanService;

  constructor() {
    super(new TrainingPlanService());
    this.trainingPlanService = this.service as TrainingPlanService;
  }

  @Get("/")
  @OpenAPI({ summary: "Get all training plans" })
  @ResponseSchema(TrainingPlanResponseDto, { isArray: true })
  async getAll() {
    return this.trainingPlanService.findAll();
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get training plan by ID" })
  @ResponseSchema(TrainingPlanResponseDto)
  async getById(@Param("id") id: number) {
    const plan = await this.trainingPlanService.findOne(id);
    if (!plan) {
      return { error: "Plan not found" };
    }
    return plan;
  }

  @Post("/")
  @OpenAPI({ summary: "Create a new training plan" })
  @ResponseSchema(TrainingPlanResponseDto)
  async create(@Body({ required: true }) data: CreateTrainingPlanDto) {
    return this.trainingPlanService.create(data);
  }

  @Patch("/:id")
  @OpenAPI({ summary: "Update a training plan" })
  @ResponseSchema(TrainingPlanResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) data: UpdateTrainingPlanDto) {
    const updated = await this.trainingPlanService.update(id, data);
    if (!updated) {
      return { error: "Plan not found" };
    }
    return updated;
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete a training plan" })
  async remove(@Param("id") id: number) {
    await this.trainingPlanService.remove(id);
    return { message: "Deleted successfully" };
  }
}

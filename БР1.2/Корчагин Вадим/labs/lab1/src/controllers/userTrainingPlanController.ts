import {
  Get, Post, Patch, Delete, Param, Body, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { UserTrainingPlan } from "../entities/UserTrainingPlan";
import { CreateUserTrainingPlanDto } from "../dto/userTrainingPlan/create-user-training-plan.dto";
import { UpdateUserTrainingPlanDto } from "../dto/userTrainingPlan/update-user-training-plan.dto";
import { UserTrainingPlanResponseDto } from "../dto/userTrainingPlan/user-training-plan-response.dto";
import { UserTrainingPlanService } from "../services/userTrainingPlanService";
import { BaseController } from "../common/baseController";

@JsonController("/user-training-plans")
export class UserTrainingPlanController extends BaseController<UserTrainingPlan> {
  private readonly userTrainingPlanService: UserTrainingPlanService;

  constructor() {
    super(new UserTrainingPlanService());
    this.userTrainingPlanService = this.service as UserTrainingPlanService;
  }

  @Get("/")
  @OpenAPI({ summary: "Get all user training plans" })
  @ResponseSchema(UserTrainingPlanResponseDto, { isArray: true })
  async getAll() {
    return this.userTrainingPlanService.findAllWithRelations();
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get a user training plan by ID" })
  @ResponseSchema(UserTrainingPlanResponseDto)
  async getById(@Param("id") id: number) {
    const plan = await this.userTrainingPlanService.findOneWithRelations(id);
    if (!plan) {
      return { error: "Not found" };
    }
    return plan;
  }

  @Post("/")
  @OpenAPI({ summary: "Create a user training plan" })
  @ResponseSchema(UserTrainingPlanResponseDto)
  async create(@Body({ required: true }) data: CreateUserTrainingPlanDto) {
    return this.userTrainingPlanService.create(data);
  }

  @Patch("/:id")
  @OpenAPI({ summary: "Update a user training plan" })
  @ResponseSchema(UserTrainingPlanResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) data: UpdateUserTrainingPlanDto) {
    const updated = await this.userTrainingPlanService.update(id, data);
    if (!updated) {
      return { error: "Not found" };
    }
    return updated;
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete a user training plan" })
  async remove(@Param("id") id: number) {
    await this.userTrainingPlanService.remove(id);
    return { message: "Deleted successfully" };
  }
}

import {
  Get, Post, Patch, Delete, Param, Body, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { UserProgress } from "../entities/UserProgress";
import { CreateUserProgressDto } from "../dto/userProgress/create-user-progress.dto";
import { UpdateUserProgressDto } from "../dto/userProgress/update-user-progress.dto";
import { UserProgressResponseDto } from "../dto/userProgress/user-progress-response.dto";
import { UserProgressService } from "../services/userProgressService";
import { BaseController } from "../common/baseController";

@JsonController("/user-progress")
export class UserProgressController extends BaseController<UserProgress> {
  private readonly userProgressService: UserProgressService;

  constructor() {
    super(new UserProgressService());
    this.userProgressService = this.service as UserProgressService;
  }

  @Get("/")
  @OpenAPI({ summary: "Get all user progress records" })
  @ResponseSchema(UserProgressResponseDto, { isArray: true })
  async getAll() {
    return this.userProgressService.findAllWithRelations();
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get user progress by ID" })
  @ResponseSchema(UserProgressResponseDto)
  async getById(@Param("id") id: number) {
    const progress = await this.userProgressService.findOneWithRelations(id);
    if (!progress) {
      return { error: "Not found" };
    }
    return progress;
  }

  @Post("/")
  @OpenAPI({ summary: "Create user progress" })
  @ResponseSchema(UserProgressResponseDto)
  async create(@Body({ required: true }) data: CreateUserProgressDto) {
    return this.userProgressService.create(data);
  }

  @Patch("/:id")
  @OpenAPI({ summary: "Update user progress" })
  @ResponseSchema(UserProgressResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) data: UpdateUserProgressDto) {
    const updated = await this.userProgressService.update(id, data);
    if (!updated) {
      return { error: "Not found" };
    }
    return updated;
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete user progress" })
  async remove(@Param("id") id: number) {
    await this.userProgressService.remove(id);
    return { message: "Deleted successfully" };
  }
}
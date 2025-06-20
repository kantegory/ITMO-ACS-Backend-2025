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
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Progress } from "../models/Progress";

const progressRepo = AppDataSource.getRepository(Progress);

@JsonController("/progresses")
@UseBefore(AuthMiddleware)
export class ProgressController {
  @Post()
  @HttpCode(201)
  async create(@Body() progressData: any) {
    const progress = progressRepo.create(progressData);
    return await progressRepo.save(progress);
  }

  @Get()
  async getAll() {
    return await progressRepo.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const progress = await progressRepo.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!progress) {
      return { status: 404, message: "Progress not found" };
    }

    return progress;
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: any) {
    const progress = await progressRepo.findOne({ where: { id } });
    if (!progress) {
      return { status: 404, message: "Progress not found" };
    }

    progressRepo.merge(progress, data);
    return await progressRepo.save(progress);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await progressRepo.delete(id);
    if (result.affected === 0) {
      return { status: 404, message: "Progress not found" };
    }

    return { message: "Progress deleted successfully" };
  }
}

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
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Progress } from "../models/Progress";

const progressRepo = AppDataSource.getRepository(Progress);

@JsonController("/progresses")
@UseBefore(AuthMiddleware)
export class ProgressController {
  @Post()
  @HttpCode(201)
  async create(@Body() progressData: Partial<Progress>) {
    const progress = progressRepo.create(progressData);
    return await progressRepo.save(progress);
  }

  @Get()
  @HttpCode(200)
  async getAll() {
    return await progressRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async getOne(@Param("id") id: string) {
    return await progressRepo.findOne({
      where: { id },
      relations: ["user"]
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() data: Partial<Progress>) {
    const progress = await progressRepo.findOne({ where: { id } });
    if (!progress) return undefined;

    progressRepo.merge(progress, data);
    return await progressRepo.save(progress);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const result = await progressRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

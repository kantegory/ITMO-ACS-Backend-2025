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
import { UserDetails } from "../models/UserDetails";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const userDetailsRepo = AppDataSource.getRepository(UserDetails);

@JsonController("/userDetails")
@UseBefore(AuthMiddleware)
export class UserDetailsController {
  @Post()
  @HttpCode(201)
  async create(@Body() data: Partial<UserDetails>) {
    const entity = userDetailsRepo.create(data);
    return await userDetailsRepo.save(entity);
  }

  @Get()
  @HttpCode(200)
  async getAll() {
    return await userDetailsRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async getOne(@Param("id") id: string) {
    return await userDetailsRepo.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() data: Partial<UserDetails>) {
    const entity = await userDetailsRepo.findOne({ where: { id } });
    if (!entity) return undefined;
    userDetailsRepo.merge(entity, data);
    return await userDetailsRepo.save(entity);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    const result = await userDetailsRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

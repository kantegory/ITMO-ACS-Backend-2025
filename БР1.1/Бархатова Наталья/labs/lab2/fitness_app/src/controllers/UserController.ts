import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  QueryParam,
  HttpCode,
  UseBefore,
  OnUndefined
} from "routing-controllers";
import { AppDataSource } from "../AppDataSource";
import { User } from "../models/User";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const userRepo = AppDataSource.getRepository(User);

@JsonController("/users")
@UseBefore(AuthMiddleware)
export class UserController {
  @Post()
  @HttpCode(201)
  async createUser(@Body() userData: Partial<User>) {
    const user = userRepo.create(userData);
    return await userRepo.save(user);
  }

  @Get()
  @HttpCode(200)
  async getAllUsers() {
    return await userRepo.find();
  }

  @Get("/by-email")
  @OnUndefined(404)
  @HttpCode(200)
  async getUserByEmail(@QueryParam("email") email: string) {
    if (!email) return undefined;
    return await userRepo.findOne({ where: { email } });
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async getUserById(@Param("id") id: string) {
    return await userRepo.findOne({ where: { id } });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async updateUser(@Param("id") id: string, @Body() updateData: Partial<User>) {
    const user = await userRepo.findOne({ where: { id } });
    if (!user) return undefined;
    userRepo.merge(user, updateData);
    return await userRepo.save(user);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  async deleteUser(@Param("id") id: string) {
    const result = await userRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

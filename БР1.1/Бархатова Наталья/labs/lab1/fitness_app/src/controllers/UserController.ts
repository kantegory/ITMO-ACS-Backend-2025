import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  QueryParam,
  NotFoundError,
  UseBefore
} from "routing-controllers";
import { AppDataSource } from "../AppDataSource";
import { User } from "../models/User";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';


@JsonController("/users")
@UseBefore(AuthMiddleware)
export class UserController {
  private userRepo = AppDataSource.getRepository(User);

  @Post("/")
  async createUser(@Body() userData: Partial<User>) {
    const user = this.userRepo.create(userData);
    return await this.userRepo.save(user);
  }

  @Get("/")
  async getAllUsers() {
    return await this.userRepo.find();
  }

  @Get("/by-email")
  async getUserByEmail(@QueryParam("email") email: string) {
    if (!email) {
      throw new NotFoundError("Email is required");
    }

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number) {
    const user = await this.userRepo.findOne({ where: { id: id.toString() } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  @Put("/:id")
  async updateUser(@Param("id") id: number, @Body() updateData: Partial<User>) {
    const user = await this.userRepo.findOne({ where: { id: id.toString() } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    this.userRepo.merge(user, updateData);
    return await this.userRepo.save(user);
  }

  @Delete("/:id")
  async deleteUser(@Param("id") id: number) {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundError("User not found");
    }

    return { message: "User deleted successfully" };
  }
}

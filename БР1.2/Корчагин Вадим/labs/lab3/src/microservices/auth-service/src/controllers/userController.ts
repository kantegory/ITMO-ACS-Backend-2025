import {
  Get, Post, Patch, Delete, Param, Body, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { User } from "../entities/User";
import { CreateUserDto } from "../dto/user/create-user.dto";
import { UpdateUserDto } from "../dto/user/update-user.dto";
import { UserResponseDto } from "../dto/user/user-response.dto";
import { UserService } from "../services/userService";
import { BaseController } from "../common/baseController";

@JsonController("/users")
export class UserController extends BaseController<User> {
  private readonly userService: UserService;

  constructor() {
    super(new UserService());
    this.userService = this.service as UserService;
  }

  @Get("/")
  @OpenAPI({ summary: "Get all users" })
  @ResponseSchema(UserResponseDto, { isArray: true })
  async getAll() {
    return this.userService.findAllWithRelations();
  }

  @Get("/id/:id")
  @OpenAPI({ summary: "Get user by ID" })
  @ResponseSchema(UserResponseDto)
  async getById(@Param("id") id: number) {
    const user = await this.userService.findOneWithRelations(id);
    if (!user) return { error: "User not found" };
    return user;
  }

  @Get("/email/:email")
  @OpenAPI({ summary: "Get user by email" })
  @ResponseSchema(UserResponseDto)
  async getByEmail(@Param("email") email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return { error: "User not found" };
    return user;
  }

  @Post("/")
  @OpenAPI({ summary: "Create a new user" })
  @ResponseSchema(UserResponseDto)
  async create(@Body({ required: true }) userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Patch("/:id")
  @OpenAPI({ summary: "Update a user" })
  @ResponseSchema(UserResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) updateData: UpdateUserDto) {
    return this.userService.update(id, updateData);
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete a user" })
  async remove(@Param("id") id: number) {
    await this.userService.remove(id);
    return { message: "User deleted" };
  }
}
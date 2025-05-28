import {
  JsonController,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  NotFoundError,
  Patch,
  UseBefore,
  CurrentUser,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { UserService } from "../services/user.service";
import { UserCreateDto } from "../dto/user/user-create.dto";
import { UserLoginDto } from "../dto/user/user-login.dto";
import { UserUpdateDto } from "../dto/user/user-update.dto";
import { UserResponseDto } from "../dto/user/user-response.dto";
import { JwtAuthMiddleware } from "../middlewares/jwt-auth.middleware";
import { TokenValidateDto } from "../dto/user/user-token-validate.dto";

@JsonController("/users")
@OpenAPI({ tags: ["Users"] })
export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @UseBefore(JwtAuthMiddleware)
  @Get()
  @ResponseSchema(UserResponseDto, { isArray: true })
  @OpenAPI({ summary: "Get all users", security: [{ bearerAuth: [] }] })
  async getAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @UseBefore(JwtAuthMiddleware)
  @Get('/:id')
  @ResponseSchema(UserResponseDto)
  @OpenAPI({ summary: "Get user by ID", security: [{ bearerAuth: [] }] })
  async getById(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  @Post("/register")
  @HttpCode(201)
  @ResponseSchema(UserResponseDto)
  @OpenAPI({ summary: "Register a new user" })
  async register(@Body() body: UserCreateDto): Promise<UserResponseDto> {
    return this.userService.create(body);
  }

  @Post("/login")
  @HttpCode(200)
  @OpenAPI({ summary: "Login user and return token" })
  async login(@Body() body: UserLoginDto): Promise<{ token: string }> {
    return this.userService.login(body.username, body.password);
  }

  @Post("/validate")
  @HttpCode(200)
  @OpenAPI({ summary: "Validate user token" })
  async validateToken(@Body() body: TokenValidateDto): Promise<{ user_id: number }> {
    return this.userService.validate(body.token);
  }

  @UseBefore(JwtAuthMiddleware)
  @Patch("/:id")
  @ResponseSchema(UserResponseDto)
  @OpenAPI({ summary: "Update user profile", security: [{ bearerAuth: [] }] })
  async update(
    @Param("id") id: number,
    @Body() body: UserUpdateDto,
    @CurrentUser() user: any,
  ): Promise<UserResponseDto> {
    this.userService.validateCurrentUser(user.id, id);
    const updated = await this.userService.update(id, body);
    if (!updated) throw new NotFoundError("User not found");
    return updated;
  }

  @UseBefore(JwtAuthMiddleware)
  @Delete("/:id")
  @HttpCode(204)
  @OpenAPI({ summary: "Delete user by ID", security: [{ bearerAuth: [] }] })
  async delete(
    @Param("id") id: number,
    @CurrentUser() user: any,
): Promise<void> {
    this.userService.validateCurrentUser(user.id, id);
    await this.userService.delete(id);
  }
}


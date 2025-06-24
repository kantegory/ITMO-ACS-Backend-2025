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
import { RecipeCreateDto } from "../dto/recipe/recipe-create.dto";
import { RecipeUpdateDto } from "../dto/recipe/recipe-update.dto";
import { RecipeResponseDto } from "../dto/recipe/recipe-response-dto";
import { RecipeService } from "../services/recipe.service";
import { plainToInstance } from "class-transformer";
import { JwtAuthMiddleware } from "../middlewares/jwt-auth.middleware";

@JsonController("/recipes")
@OpenAPI({ tags: ["recipes"] })
export class RecipeController {
  private readonly recipeService: RecipeService;

  constructor() {
    this.recipeService = new RecipeService();
  }

  @Get()
  @ResponseSchema(RecipeResponseDto, { isArray: true })
  @OpenAPI({ summary: "Get all recipes" })
  async getAll(): Promise<RecipeResponseDto[]> {
    const recipes = await this.recipeService.findAll();
    return plainToInstance(RecipeResponseDto, recipes);
  }

  @Get("/:id")
  @ResponseSchema(RecipeResponseDto)
  @OpenAPI({ summary: "Get recipe by ID" })
  async getOne(@Param("id") id: number): Promise<RecipeResponseDto> {
    const recipe = await this.recipeService.findOne(id);
    if (!recipe) throw new NotFoundError("Recipe not found");
    return plainToInstance(RecipeResponseDto, recipe);
  }

  @Post()
  @HttpCode(201)
  @UseBefore(JwtAuthMiddleware)
  @ResponseSchema(RecipeResponseDto)
  @OpenAPI({ summary: "Create new recipe", security: [{ bearerAuth: [] }] })
  async create(
    @Body({required: true}) body: RecipeCreateDto,
    @CurrentUser() user: any,
  ): Promise<RecipeResponseDto> {
    const recipe = this.recipeService.create({...body, user_id: user.id});
    return plainToInstance(RecipeResponseDto, recipe);
  }

  @Patch("/:id")
  @UseBefore(JwtAuthMiddleware)
  @ResponseSchema(RecipeResponseDto)
  @OpenAPI({ summary: "Update recipe by ID", security: [{ bearerAuth: [] }] })
  async update(
    @Param("id") id: number,
    @Body({ required: true }) body: RecipeUpdateDto,
    @CurrentUser() user: any,
  ): Promise<RecipeResponseDto> {
    const updated = await this.recipeService.updateWithCheck(id, user.id, body);
    if (!updated) throw new NotFoundError("Recipe not found");
    return plainToInstance(RecipeResponseDto, updated);
  }

  @Delete("/:id")
  @HttpCode(204)
  @UseBefore(JwtAuthMiddleware)
  @OpenAPI({ summary: "Delete recipe by ID", security: [{ bearerAuth: [] }] })
  async delete(
    @Param("id") id: number,
    @CurrentUser() user: any,
  ) {
    await this.recipeService.deleteWithCheck(id, user.id);
    return {"ok": true};
  }
}

import {
  JsonController,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  NotFoundError,
  UseBefore,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { IngredientCreateDto } from "../dto/ingredient/ingredient-create.dto";
import { IngredientResponseDto } from "../dto/ingredient/ingredient-response.dto";
import { IngredientService } from "../services/ingredient.service";
import { IngredientUpdateDto } from "../dto/ingredient/ingredient-update.dto";
import { JwtAuthMiddleware } from "../middlewares/jwt-auth.middleware";

@JsonController("/ingredients")
@OpenAPI({ tags: ["Ingredients"] })
export class IngredientController {
  private readonly ingredientService: IngredientService;

  constructor() {
    this.ingredientService = new IngredientService();
  }

  @Get()
  @ResponseSchema(IngredientResponseDto, { isArray: true })
  @OpenAPI({ summary: "Get all ingredients" })
  async getAll(): Promise<IngredientResponseDto[]> {
    return this.ingredientService.findAll();
  }

  @Get("/:id")
  @ResponseSchema(IngredientResponseDto)
  @OpenAPI({ summary: "Get ingredient by ID" })
  async getOne(@Param("id") id: number): Promise<IngredientResponseDto> {
    const ingredient = await this.ingredientService.findOne(id);
    if (!ingredient) throw new NotFoundError("Ingredient not found");
    return ingredient;
  }

  @Post()
  @HttpCode(201)
  @UseBefore(JwtAuthMiddleware)
  @ResponseSchema(IngredientResponseDto)
  @OpenAPI({ summary: "Create new ingredient", security: [{ bearerAuth: [] }] })
  async create(@Body({required: true}) body: IngredientCreateDto): Promise<IngredientResponseDto> {
    return this.ingredientService.create(body);
  }

  @Patch("/:id")
  @UseBefore(JwtAuthMiddleware)
  @ResponseSchema(IngredientResponseDto)
  @OpenAPI({ summary: "Update ingredient by ID", security: [{ bearerAuth: [] }] })
  async update(
    @Param("id") id: number,
    @Body({ required: true }) body: IngredientUpdateDto
  ): Promise<IngredientResponseDto> {
    const updated = await this.ingredientService.update(id, body);
    if (!updated) throw new NotFoundError("Ingredient not found");
    return updated;
  }

  @Delete("/:id")
  @HttpCode(204)
  @UseBefore(JwtAuthMiddleware)
  @OpenAPI({ summary: "Delete ingredient by ID", security: [{ bearerAuth: [] }] })
  async delete(@Param('id') id: number) {
    await this.ingredientService.delete(id);
    return {"ok": true};
  }
}

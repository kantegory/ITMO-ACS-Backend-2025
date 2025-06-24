import {
  JsonController,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseBefore,
  NotFoundError,
  HttpCode,
  Delete,
  CurrentUser,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { CommentService } from "../services/comment.service";
import { JwtAuthMiddleware } from "../middlewares/jwt-auth.middleware";
import { CommentCreateDto } from "../dto/comment/comment-create.dto";
import { CommentUpdateDto } from "../dto/comment/comment-update.dto";
import { CommentResponseDto } from "../dto/comment/comment-response.dto";

@JsonController("/comments")
@OpenAPI({ tags: ["Comments"] })
export class CommentController {
  private readonly commentService: CommentService;

  constructor () {
    this.commentService = new CommentService();
  }

  @Post()
  @UseBefore(JwtAuthMiddleware)
  @HttpCode(201)
  @ResponseSchema(CommentResponseDto)
  @OpenAPI({ summary: "Create a new comment", security: [{ bearerAuth: [] }] })
  async create(
    @Body() body: CommentCreateDto,
    @CurrentUser() user: any,
): Promise<CommentResponseDto> {
    return this.commentService.create({ ...body, user_id: user.id });
  }

  @Get("/:id")
  @ResponseSchema(CommentResponseDto)
  @OpenAPI({ summary: "Get comment by ID" })
  async getById(@Param("id") id: number): Promise<CommentResponseDto> {
    const comment = await this.commentService.findOne(id);
    if (!comment) throw new NotFoundError("Comment not found");
    return comment;
  }

  @Get("/recipe/:recipeId")
  @ResponseSchema(CommentResponseDto, { isArray: true })
  @OpenAPI({ summary: "Get all comments for a recipe" })
  async getByRecipe(@Param("recipeId") recipeId: number): Promise<CommentResponseDto[]> {
    return this.commentService.getByRecipeId(recipeId);
  }

  @Patch("/:id")
  @UseBefore(JwtAuthMiddleware)
  @ResponseSchema(CommentResponseDto)
  @OpenAPI({ summary: "Update a comment", security: [{ bearerAuth: [] }] })
  async update(
    @Param("id") id: number,
    @Body() body: CommentUpdateDto,
    @CurrentUser() user: any,
  ): Promise<CommentResponseDto> {
    const updated = await this.commentService.updateWithCheck(id, user.id, body);
    if (!updated) throw new NotFoundError("Comment not found or not authorized");
    return updated;
  }

  @Delete("/:id")
  @UseBefore(JwtAuthMiddleware)
  @HttpCode(204)
  @OpenAPI({ summary: "Delete a comment", security: [{ bearerAuth: [] }] })
  async delete(
    @Param("id") id: number,
    @CurrentUser() user: any,
): Promise<{}> {
    await this.commentService.deleteWithCheck(id, user.id);
    return { ok: true };
  }
}

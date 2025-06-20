import {
  JsonController,
  Post,
  Delete,
  Get,
  Param,
  Body,
  HttpCode,
  NotFoundError,
  UseBefore,
  CurrentUser
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { LikeService } from "../services/like.service";
import { LikeCreateDto } from "../dto/like/like-create.dto";
import { LikeResponseDto } from "../dto/like/like-response.dto";
import { JwtAuthMiddleware } from "../middlewares/jwt-auth.middleware";

@UseBefore(JwtAuthMiddleware)
@JsonController("/likes")
@OpenAPI({ tags: ["Likes"] })
export class LikeController {
  private readonly likeService: LikeService;

  constructor() {
    this.likeService = new LikeService();
  }

  @Post()
  @HttpCode(201)
  @ResponseSchema(LikeResponseDto)
  @OpenAPI({ summary: "Create a new like", security: [{ bearerAuth: [] }] })
  async create(
    @Body() body: LikeCreateDto,
    @CurrentUser() user: any,
): Promise<LikeResponseDto> {
    return this.likeService.create({...body, user_id: user.id});
  }

  @UseBefore(JwtAuthMiddleware)
  @Delete("/:id")
  @HttpCode(204)
  @OpenAPI({ summary: "Delete like by ID", security: [{ bearerAuth: [] }] })
  async delete(
    @Param("id") id: number,
    @CurrentUser() user: any,
): Promise<{}> {
    await this.likeService.deleteWithCheck(id, user.id);
    return {ok: true};
  }

  @UseBefore(JwtAuthMiddleware)
  @Get("")
  @ResponseSchema(LikeResponseDto, { isArray: true })
  @OpenAPI({ summary: "Get all likes by user ID", security: [{ bearerAuth: [] }] })
  async getByUserId(
    @CurrentUser() user: any,
): Promise<LikeResponseDto[]> {
    return this.likeService.findAllForUser(user.id);
  }
}

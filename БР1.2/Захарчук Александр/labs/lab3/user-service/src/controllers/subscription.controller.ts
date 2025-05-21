import {
  JsonController,
  Post,
  Delete,
  Get,
  Body,
  Param,
  UseBefore,
  CurrentUser,
  HttpCode,
  NotFoundError
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { SubscriptionService } from "../services/subscription.service";
import { SubscriptionCreateDto } from "../dto/subscription/subscription-create.dto";
import { SubscriptionResponseDto } from "../dto/subscription/subscription-response.dto";
import { JwtAuthMiddleware } from "../middlewares/jwt-auth.middleware";

@JsonController("/subscriptions")
@UseBefore(JwtAuthMiddleware)
@OpenAPI({ tags: ["Subscriptions"] })
export class SubscriptionController {
  private readonly subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  @Post()
  @HttpCode(201)
  @OpenAPI({ summary: "Subscribe to another user", security: [{ bearerAuth: [] }] })
  @ResponseSchema(SubscriptionResponseDto)
  async subscribe(
    @Body() body: SubscriptionCreateDto,
    @CurrentUser() user: any,
): Promise<SubscriptionResponseDto> {
    return this.subscriptionService.create({...body, follower_id: user.id});
  }

  @Delete("/:id")
  @HttpCode(204)
  @OpenAPI({ summary: "Unsubscribe from a user", security: [{ bearerAuth: [] }] })
  async unsubscribe(
    @Param("id") subscriptionId: number,
    @CurrentUser() user: any,
  ): Promise<{}> {
    await this.subscriptionService.deleteWithCheck(subscriptionId, user.id);
    return {"ok": true};
  }

  @Get("")
  @OpenAPI({ summary: "Get users followed by a current user", security: [{ bearerAuth: [] }] })
  @ResponseSchema(SubscriptionResponseDto, { isArray: true })
  async getFollowing(
    @CurrentUser() user: any,
): Promise<SubscriptionResponseDto[]> {
    return this.subscriptionService.findForUser(user.id);
  }
}

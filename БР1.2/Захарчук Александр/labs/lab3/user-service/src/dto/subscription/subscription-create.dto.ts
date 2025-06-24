import { IsInt, Min } from "class-validator";

export class SubscriptionCreateDto {
  @IsInt()
  @Min(1)
  following_id: number;
}

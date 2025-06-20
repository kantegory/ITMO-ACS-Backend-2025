import { IsInt, Min } from "class-validator";

export class SubscriptionResponseDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsInt()
  @Min(1)
  follower_id: number;

  @IsInt()
  @Min(1)
  following_id: number;
}

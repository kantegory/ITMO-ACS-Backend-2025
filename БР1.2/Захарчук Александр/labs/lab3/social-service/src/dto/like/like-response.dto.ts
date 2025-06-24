import { IsInt } from "class-validator";

export class LikeResponseDto {
  @IsInt()
  id: number;

  @IsInt()
  user_id: number;

  @IsInt()
  recipe_id: number;
}

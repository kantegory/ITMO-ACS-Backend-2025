import { IsInt, Min } from "class-validator";

export class LikeCreateDto {
  @IsInt()
  @Min(1)
  recipe_id: number;
}

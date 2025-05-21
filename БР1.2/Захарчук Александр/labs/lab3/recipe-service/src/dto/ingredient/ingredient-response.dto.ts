import { IsInt, IsString, Min } from "class-validator";

export class IngredientResponseDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}

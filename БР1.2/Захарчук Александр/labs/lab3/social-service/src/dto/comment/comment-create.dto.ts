import { IsInt, IsString, Min, MaxLength, MinLength } from "class-validator";

export class CommentCreateDto {
  @IsInt()
  @Min(1)
  recipe_id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  text: string;
}

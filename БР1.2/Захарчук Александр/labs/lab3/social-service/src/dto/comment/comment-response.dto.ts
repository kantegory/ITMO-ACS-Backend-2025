import { IsInt, IsString } from "class-validator";

export class CommentResponseDto {
  @IsInt()
  id: number;

  @IsInt()
  user_id: number;
  
  @IsInt()
  recipe_id: number;

  @IsString()
  text: string;
}

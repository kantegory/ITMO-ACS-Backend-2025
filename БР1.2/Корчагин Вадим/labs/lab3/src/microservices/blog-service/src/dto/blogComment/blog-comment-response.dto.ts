import { IsInt, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class BlogCommentResponseDto {
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsInt()
  @Type(() => Number)
  post_id: number;

  @IsInt()
  @Type(() => Number)
  user_id: number;

  @IsString()
  @Type(() => String)
  comment_text: string;

  @IsDate()
  @Type(() => Date)
  created_at: Date;
}

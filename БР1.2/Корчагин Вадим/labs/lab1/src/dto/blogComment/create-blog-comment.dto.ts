import { IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateBlogCommentDto {
  @IsInt()
  @Type(() => Number)
  post_id: number;

  @IsInt()
  @Type(() => Number)
  user_id: number;

  @IsString()
  @Type(() => String)
  comment_text: string;
}

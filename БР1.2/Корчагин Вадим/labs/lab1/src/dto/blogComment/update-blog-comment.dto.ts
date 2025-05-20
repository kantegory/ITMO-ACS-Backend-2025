import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateBlogCommentDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  comment_text?: string;
}

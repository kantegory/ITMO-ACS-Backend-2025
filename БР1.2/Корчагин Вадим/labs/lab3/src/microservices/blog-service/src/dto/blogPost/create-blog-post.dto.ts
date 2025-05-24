import { IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateBlogPostDto {
  @IsInt()
    @Type(() => Number)
  author_id: number;

  @IsString()
    @Type(() => String)
  title: string;

  @IsString()
    @Type(() => String)
  content: string;
}

import { IsInt, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class BlogPostResponseDto {
  @IsInt()
    @Type(() => Number)
  id: number;

  @IsInt()
    @Type(() => Number)
  author_id: number;

  @IsString()
    @Type(() => String)
  title: string;

  @IsString()
    @Type(() => String)
  content: string;

  @IsDate()
    @Type(() => Date)
  created_at: Date;

  @IsDate()
    @Type(() => Date)
  updated_at: Date;
}

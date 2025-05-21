import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateBlogPostDto {
  @IsOptional()
  @IsString()
    @Type(() => String)
  title?: string;

  @IsOptional()
  @IsString()
    @Type(() => String)
  content?: string;
}

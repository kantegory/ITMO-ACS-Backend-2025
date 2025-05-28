import { IsString, MaxLength, MinLength } from "class-validator";

export class CommentUpdateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  text: string;
}

import { IsString } from "class-validator";
import { Type } from "class-transformer";

export class LoginResponseDto {
  @IsString()
    @Type(() => String)
  token: string;
}

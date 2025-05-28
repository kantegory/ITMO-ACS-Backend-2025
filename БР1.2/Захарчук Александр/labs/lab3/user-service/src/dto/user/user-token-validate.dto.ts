import { IsString } from "class-validator";

export class TokenValidateDto {
  @IsString()
  token: string;
}

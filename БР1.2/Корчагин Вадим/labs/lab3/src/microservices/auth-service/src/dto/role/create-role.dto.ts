import { IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateRoleDto {
  @IsString()
    @Type(() => String)
  role_name: string;
}

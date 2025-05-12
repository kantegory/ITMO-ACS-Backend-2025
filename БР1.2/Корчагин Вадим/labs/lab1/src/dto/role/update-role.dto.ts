import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
    @Type(() => String)
  role_name?: string;
}

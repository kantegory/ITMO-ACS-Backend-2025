import { IsInt, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class RoleResponseDto {
  @IsInt()
    @Type(() => Number)
  id: number;

  @IsString()
    @Type(() => String)
  role_name: string;

  @IsDate()
    @Type(() => Date)
  created_at: Date;

  @IsDate()
    @Type(() => Date)
  updated_at: Date;
}

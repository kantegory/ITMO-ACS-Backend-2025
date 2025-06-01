import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"
import { EdgeType } from "../models/Edge"

export class CreateEdgeDto
{
    @IsString()
    @Type(() => String)
    name: string

    @IsString()
    @Type(() => String)
    description: string

    @IsEnum(EdgeType)
    @Type(() => String)
    type: EdgeType
}

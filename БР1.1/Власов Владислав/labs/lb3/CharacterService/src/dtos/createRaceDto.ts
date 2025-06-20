import { Type } from "class-transformer"
import { IsString } from "class-validator"

export class CreateRaceDto
{
    @IsString()
    @Type(() => String)
    name: string

    @IsString()
    @Type(() => String)
    description: string
}

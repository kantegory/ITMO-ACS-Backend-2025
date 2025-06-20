import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"

export class CreateCharacterDto
{
    @IsNumber()
    @Type(() => Number)
    playerId: number

    @IsBoolean()
    @Type(() => Boolean)
    isWildCard: boolean
}

import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"
import { ItemType } from "../models/Item"
import { ItemStatus } from "../models/ItemToCharacter"

export class ChangeItemStatusDto
{
    @IsEnum(ItemStatus)
    @Type(() => String)
    status: ItemStatus
}

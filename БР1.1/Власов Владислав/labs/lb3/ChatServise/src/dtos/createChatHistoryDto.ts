import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"
import { ChatEventType } from "../models/ChatHistory"

export class CreateChatHistoryDto
{
    @IsEnum(ChatEventType)
    @Type(() => String)
    eventType: string

    @IsNumber()
    @Type(() => Number)
    eventId: number
}
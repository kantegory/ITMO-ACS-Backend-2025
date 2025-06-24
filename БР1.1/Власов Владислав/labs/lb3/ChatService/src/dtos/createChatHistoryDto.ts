import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { ChatEventType } from "../models/ChatHistory"
import { Message } from "../models/Message"
import { Roll } from "../models/Roll"

export class CreateChatHistoryDto
{
    @IsEnum(ChatEventType)
    @Type(() => String)
    eventType: string

    @IsOptional()
    @ValidateNested()
    @Type(() => Message)
    message?: Message

    @IsOptional()
    @ValidateNested()
    @Type(() => Roll)
    roll?: Roll
}
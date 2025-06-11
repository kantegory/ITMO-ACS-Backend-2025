import { IsString, IsOptional, IsDateString, IsNumber, IsObject, IsArray } from 'class-validator';
import { UserDto } from './UserDtos';

export class MessageDto {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsString()
    inner!: string

    @IsOptional()
    @IsNumber()
    senderId!: number

    @IsOptional()
    @IsNumber()
    receiverId!: number

    @IsOptional()
    @IsDateString()
    sentAt!: Date

    constructor(init?: Partial<MessageDto>) {
        Object.assign(this, init);
    }
}

export class DialogDto {
    @IsObject()
    sender!: UserDto

    @IsObject()
    receiver!: UserDto

    @IsArray()
    messages: MessageDto[] = [];
}

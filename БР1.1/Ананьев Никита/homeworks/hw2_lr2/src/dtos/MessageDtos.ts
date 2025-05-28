import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class MessageDto {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsString()
    inner!: string

    @IsNumber()
    senderId!: number

    @IsNumber()
    receiverId!: number

    @IsDateString()
    sentAt!: Date

    constructor(init?: Partial<MessageDto>) {
        Object.assign(this, init);
    }
}

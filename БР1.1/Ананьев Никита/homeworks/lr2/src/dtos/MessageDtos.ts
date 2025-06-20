import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

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

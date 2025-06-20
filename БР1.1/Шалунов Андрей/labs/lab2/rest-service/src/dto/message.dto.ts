import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
    @IsInt()
    sender_id!: number;

    @IsInt()
    recipient_id!: number;

    @IsInt()
    booking_id!: number;

    @IsString()
    text!: string;
}

export class UpdateMessageDto {
    @IsOptional()
    @IsString()
    text?: string;
}
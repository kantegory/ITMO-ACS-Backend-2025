import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SendMessageDto {
    @IsNumber()
    propertyId!: number;

    @IsNumber()
    receiverId!: number;

    @IsString()
    @IsNotEmpty()
    content!: string;
}

export class UpdateMessageDto {
    @IsString()
    @IsNotEmpty()
    content!: string;
}
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export interface Discussion {
    discussionId: string;
    property: {
        id: number;
        title: string;
    };
    participant: {
        id: number;
        username: string;
    };
    lastMessage: {
        content: string;
        sentAt: Date;
        isOwn: boolean;
    };
    totalMessages: number;
}
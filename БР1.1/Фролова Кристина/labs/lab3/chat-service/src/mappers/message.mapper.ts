import {MessageEntity} from "../entities/message.entity";
import {Message} from "../models/models/message.model";

import {MessageResponseDto} from "../models/responses/message-response.dto";
import {CreateMessageRequestDto} from "../models/requests/message-create.dto";
import {CreateMessageModel} from "../models/requests/message-create.model";

export function toMessage(entity: MessageEntity): Message {
    return {
        id: entity.id,
        senderId: entity.senderId,
        receiverId: entity.receiverId,
        advertisementId: entity.advertisementId,
        text: entity.text,
        createdAt: entity.createdAt,
    };
}

export function toMessageResponseModel(message: Message): MessageResponseDto {
    return {
        id: message.id,
        senderId: message.senderId,
        receiverId: message.receiverId,
        advertisementId: message.advertisementId,
        text: message.text,
        createdAt: message.createdAt,
    };
}
export function createMessageRequestToCreateData(request: CreateMessageRequestDto): CreateMessageModel {
    return {
        text: request.text,
        senderId: request.senderId,
        receiverId: request.receiverId,
        advertisementId: request.advertisementId,
    };
}




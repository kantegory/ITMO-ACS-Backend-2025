import {MessageEntity} from "../entities/message.entity";
import {Message} from "../models/models/message.model";
import {MessageResponseDto} from "../models/responses/message-response.dto";

import {toUserResponseModel} from "./user.mapper";
import {CreateMessageRequestDto} from "../models/requests/message/message-create.dto";
import {toAdvertisementResponseModel} from "./advertisement.mapper";
import {CreateMessageModel} from "../models/requests/message/message-create.model";

export function toMessage(entity: MessageEntity): Message {
    return {
        id: entity.id,
        sender: entity.sender,
        receiver: entity.receiver,
        advertisement: entity.advertisement,
        text: entity.text,
        createdAt: entity.createdAt,
    };
}

export function toMessageResponseModel(message: Message): MessageResponseDto {
    return {
        id: message.id,
        sender: toUserResponseModel(message.sender),
        receiver: toUserResponseModel(message.receiver),
        advertisement: toAdvertisementResponseModel(message.advertisement),
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




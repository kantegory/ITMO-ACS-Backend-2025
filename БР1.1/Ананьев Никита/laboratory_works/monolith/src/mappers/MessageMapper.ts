import { Message } from "../models/MessageModel";
import { MessageDto } from "../dtos/MessageDtos";
import { User } from "../models/UserModel";

export class MessageMapper {
    static toDto(model: Message): MessageDto {
        const { sender, receiver, ...rest } = model
        const dto = new MessageDto(rest)
        // if (typeof(sender) != undefined ){
        //      dto.senderId = sender.id
        // }
        // if (typeof(receiver) != undefined ){
        //     dto.receiverId = receiver.id
        // }
        return dto
    }

    static toModel(dto: MessageDto): Message {
        const { senderId, receiverId, ...rest } = dto
        const model = new Message(rest)
        model.sender = { id: dto.senderId } as User
        model.receiver = { id: dto.receiverId } as User
        return model
    }
}

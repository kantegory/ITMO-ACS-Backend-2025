import { Message } from "../models/MessageModel";
import { MessageDto } from "../dtos/MessageDtos";

export class MessageMapper {
    static toDto(model: Message): MessageDto {
        const { ...fields } = model
        const dto = new MessageDto(fields)
        return dto
    }

    static toModel(dto: MessageDto): Message {
        const { ...fields } = dto
        const model = new Message(fields)
        return model
    }
}

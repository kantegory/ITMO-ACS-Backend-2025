import { Service, Inject } from 'typedi';
import { MessageDto } from "../dtos/MessageDtos"
import { Message } from "../models/MessageModel"
import { MessageMapper } from "../mappers/MessageMapper"
import { Repository } from "typeorm"
import { CreationError } from "../errors/CreationError"


export interface IMessageService {
    send(messageData: MessageDto): Promise<MessageDto>
    findDialog(firstId: number, secondId: number): Promise<MessageDto[]>
    findReceivers(userId: number): Promise<number[]>
}


@Service('IMessageService')
export class MessageService implements IMessageService {
    constructor(
        @Inject('message.repository')
        protected readonly repository: Repository<Message>
    ) {}

    async send(messageData: MessageDto): Promise<MessageDto> {
        let message: Message = MessageMapper.toModel(messageData)
        try {
            message.sentAt = new Date();
            message = await this.repository.save(message)
            return MessageMapper.toDto(message)
            // TODO: implement notifier
        } catch (error: any) {
            console.log(error)
            throw new CreationError("Message send failed")
        }
    }

    async findDialog(firstId: number, secondId: number): Promise<MessageDto[]> {
        const messagesFromFirst = await this.repository.findBy({senderId: firstId, receiverId: secondId})
        const messagesFromSecond = await this.repository.findBy({senderId: secondId, receiverId: firstId})
        const allMessages = messagesFromFirst.concat(messagesFromSecond);
        return allMessages.map((m: Message) => MessageMapper.toDto(m));
    }

    async findReceivers(userId: number): Promise<number[]> {
        const results = await this.repository
            .createQueryBuilder("message")
            .select("DISTINCT CASE WHEN message.senderId = :userId THEN message.receiverId ELSE message.senderId END", "id")
            .where("message.senderId = :userId OR message.receiverId = :userId", { userId: userId })
            .getRawMany();
    
        return results.map(r => r.id)
    }
}

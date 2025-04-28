export class MessageDto {
    id?: number
    inner!: string
    senderId!: number
    receiverId!: number
    sentAt!: Date

    constructor(init?: Partial<MessageDto>) {
        Object.assign(this, init);
    }
}

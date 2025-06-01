export interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    advertisementId: number;
    text: string;
    createdAt: Date;
}
export interface CreateMessageDto {
    sender_id: number;
    recipient_id: number;
    booking_id: number;
    text: string;
  }
  
export type UpdateMessageDto = Partial<
    Omit<CreateMessageDto, 'sender_id' | 'recipient_id' | 'booking_id'>
>;
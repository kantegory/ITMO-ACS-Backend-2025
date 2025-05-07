export interface CreateBookingDto {
    property_id: number;
    renter_id: number;
    start_at: Date;
    end_at: Date;
    total_price: number;
    deal_status: string;
  }
  
export type UpdateBookingDto = Partial<
    Omit<CreateBookingDto, 'property_id' | 'renter_id'>
>; 
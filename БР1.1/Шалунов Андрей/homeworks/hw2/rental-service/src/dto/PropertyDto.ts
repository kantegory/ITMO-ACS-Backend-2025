export interface CreatePropertyDto {
    owner_id: number;
    type: string;
    title: string;
    description: string;
    location: string;
    price_per_day: string;
    status: string;
  }
  
export type UpdatePropertyDto = Partial<Omit<CreatePropertyDto, 'owner_id'>>;
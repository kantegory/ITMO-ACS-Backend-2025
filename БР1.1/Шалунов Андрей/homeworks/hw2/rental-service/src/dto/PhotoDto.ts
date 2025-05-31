export interface CreatePhotoDto {
    property_id: number;
    photo_url: string;
    description?: string;
  }
  
export type UpdatePhotoDto = Partial<Omit<CreatePhotoDto, 'property_id'>>;
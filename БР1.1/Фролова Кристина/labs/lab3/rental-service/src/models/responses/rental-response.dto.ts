export interface RentalResponseDto {
    id: number;
    advertisementId: number;
    renterId: number;
    totalPrice: number;
    startDate: Date;
    endDate: Date;
}

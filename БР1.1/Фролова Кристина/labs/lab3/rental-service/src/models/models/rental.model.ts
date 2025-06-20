export interface Rental {
    id: number;
    advertisementId: number;
    renterId: number;
    totalPrice: number;
    startDate: Date;
    endDate: Date;
}
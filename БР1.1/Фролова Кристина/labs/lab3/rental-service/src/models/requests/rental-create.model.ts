export interface CreateRentalModel {
    advertisementId: number;
    renterId: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
}
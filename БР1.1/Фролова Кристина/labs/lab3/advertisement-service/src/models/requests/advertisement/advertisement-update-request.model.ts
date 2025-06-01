import {AdvertisementStatus, RentType} from "@rent/shared";

export interface UpdateAdvertisementModel {
    title?: string;
    description?: string;
    rentType?: RentType;
    status?: AdvertisementStatus;
    pricePerPeriod?: number;
    commission?: number;
    deposit?: number;
}
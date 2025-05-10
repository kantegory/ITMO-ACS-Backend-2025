import {RentType} from "../../enums/rent.type";
import {AdvertisementStatus} from "../../enums/advertisment.status";

export interface UpdateAdvertisementModel {
    title?: string;
    description?: string;
    rentType?: RentType;
    status?: AdvertisementStatus;
    pricePerPeriod?: number;
    commission?: number;
    deposit?: number;
}
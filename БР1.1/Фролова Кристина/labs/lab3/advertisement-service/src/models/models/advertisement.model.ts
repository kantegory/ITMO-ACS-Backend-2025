import {Category} from "./category.model";
import {Photo} from "./photo.model";
import {Rules} from "./rules.model";
import {Property} from "./property.model";
import {AdvertisementStatus, RentType} from "@rent/shared";

export interface Advertisement {
    id: number;
    ownerId: number;
    title: string;
    description: string;
    category: Category;
    rentType: RentType;
    status: AdvertisementStatus;
    createdAt: Date;
    pricePerPeriod: number;
    commission: number;
    deposit: number;
    property?: Property;
    photos?: Photo[];
    rules?: Rules;
}
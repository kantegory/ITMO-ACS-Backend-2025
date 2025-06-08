import {User} from "./user.model";
import {RentType} from "../enums/rent.type";
import {Category} from "./category.model";
import {AdvertisementStatus} from "../enums/advertisment.status";
import {Photo} from "./photo.model";
import {Message} from "./message.model";
import {Rules} from "./rules.model";
import {Property} from "./property.model";

export interface Advertisement {
    id: number;
    owner: User;
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
    messages?: Message[];
    rules?: Rules;
}
import {Advertisement} from "./advertisement.model";
import {User} from "./user.model";

export interface Rental {
    id: number;
    advertisement: Advertisement;
    renter: User;
    totalPrice: number;
    startDate: Date;
    endDate: Date;
}
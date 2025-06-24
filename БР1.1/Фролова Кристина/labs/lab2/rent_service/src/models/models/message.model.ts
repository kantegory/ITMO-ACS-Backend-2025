import {User} from "./user.model";
import {Advertisement} from "./advertisement.model";

export interface Message {
    id: number;
    sender: User;
    receiver: User;
    advertisement: Advertisement;
    text: string;
    createdAt: Date;
}
import {Advertisement} from "./advertisement.model";
import {Living} from "./living.model";

export interface Property {
    id: number;
    advertisement?: Advertisement;
    totalArea: number;
    location: string;
    living?: Living;
}
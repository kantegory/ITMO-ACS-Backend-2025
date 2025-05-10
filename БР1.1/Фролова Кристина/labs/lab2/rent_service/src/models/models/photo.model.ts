import {Advertisement} from "./advertisement.model";

export interface Photo {
    id: number;
    advertisement?: Advertisement
    path: string
}
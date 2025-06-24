import {Living} from "./living.model";

export interface Comfort {
    id: number;
    living?: Living;
    renovation: string;
    devices: string;
    internet: boolean;
    tv: boolean;
    furniture: string;
}
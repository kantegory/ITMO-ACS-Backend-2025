import {Living} from "./living.model";

export interface CountryHouse {
    id: number;
    living?: Living;
    landArea: number;
    communications: string;
    recreations: string;
}
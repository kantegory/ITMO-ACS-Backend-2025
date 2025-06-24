import {Living} from "./living.model";

export interface Flat {
    id: number;
    living?: Living;
    floor: number;
    kitchenArea: number;
    livingArea: number;
}
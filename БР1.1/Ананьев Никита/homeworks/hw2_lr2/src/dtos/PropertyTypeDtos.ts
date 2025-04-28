import { ResponsePropertyDto } from "./PropertyDtos";

export class PropertyTypeDto {
    id?: number
    name!: string
    properties?: ResponsePropertyDto[]
}
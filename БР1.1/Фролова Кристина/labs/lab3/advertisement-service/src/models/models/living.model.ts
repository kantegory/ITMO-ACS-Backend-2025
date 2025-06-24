import {Property} from "./property.model";
import {Comfort} from "./comfort.model";
import {Flat} from "./flat.model";
import {Room} from "./room.model";
import {CountryHouse} from "./country-house.model";
import {LivingType} from "@rent/shared";

export interface Living {
    id: number;
    property?: Property;
    livingType: LivingType;
    totalFloors: number;
    totalRooms: number;
    area: number;
    meter: number;
    other: number;
    comfort?: Comfort;
    flat?: Flat;
    room?: Room;
    countryHouse?: CountryHouse;
}
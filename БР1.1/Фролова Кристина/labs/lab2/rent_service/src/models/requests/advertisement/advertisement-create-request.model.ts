import {RentType} from "../../enums/rent.type";
import {CreatePropertyModel} from "../property/property-create-request.model";
import {CreatePhotoModel} from "../photo/photo-create-request.model";
import {CreateRulesModel} from "../rules/rules-create-request.model";

export interface CreateAdvertisementModel {
    title: string;
    description: string;
    categoryId: number;
    rentType: RentType;
    pricePerPeriod: number;
    commission: number;
    deposit: number;
    ownerId: number;
    property: CreatePropertyModel;
    rules: CreateRulesModel;
    photos: CreatePhotoModel[];
}

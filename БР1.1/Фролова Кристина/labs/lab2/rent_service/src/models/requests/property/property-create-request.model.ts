import {CreateLivingModel} from "../living/living-create-request.model";

export interface CreatePropertyModel {
    totalArea: number;
    location: string;
    living: CreateLivingModel;
}
import {RentalEntity} from "../entities/rental.entity";
import {Rental} from "../models/models/rental.model";
import {RentalResponseDto} from "../models/responses/rental-response.dto";
import {CreateRentalRequestDto} from "../models/requests/rental/rental-create.dto";
import {UpdateRentalRequestDto} from "../models/requests/rental/rental-update.dto";
import {CreateRentalModel} from "../models/requests/rental/rental-create.model";
import {UpdateRentalData} from "../models/requests/rental/rental-update.model";
import {entityToAdvertisement, toAdvertisementResponseModel} from "./advertisement.mapper";
import {toUserResponseModel} from "./user.mapper";

export function toRental(entity: RentalEntity): Rental {
    return {
        id: entity.id,
        advertisement: entityToAdvertisement(entity.advertisement),
        renter: entity.renter,
        totalPrice: entity.totalPrice,
        startDate: entity.startDate,
        endDate: entity.endDate,
    };
}

export function toRentalResponseModel(rental: Rental): RentalResponseDto {
    return {
        id: rental.id,
        advertisement: toAdvertisementResponseModel(rental.advertisement),
        renter: toUserResponseModel(rental.renter),
        totalPrice: rental.totalPrice,
        startDate: rental.startDate,
        endDate: rental.endDate,
    };
}

export function createRentalRequestToRentalData(request: CreateRentalRequestDto): CreateRentalModel {
    return {
        advertisementId: request.advertisementId,
        renterId: request.renterId,
        totalPrice: request.totalPrice,
        startDate: request.startDate,
        endDate: request.endDate,
    };
}

export function updateRentalRequestToRentalData(request: UpdateRentalRequestDto): UpdateRentalData {
    return {
        totalPrice: request.totalPrice,
        startDate: request.startDate,
        endDate: request.endDate,
    };
}

import {RentalEntity} from "../entities/rental.entity";
import {Rental} from "../models/models/rental.model";
import {RentalResponseDto} from "../models/responses/rental-response.dto";
import {CreateRentalRequestDto} from "../models/requests/rental-create.dto";
import {CreateRentalModel} from "../models/requests/rental-create.model";
import {UpdateRentalRequestDto} from "../models/requests/rental-update.dto";
import {UpdateRentalData} from "../models/requests/rental-update.model";


export function toRental(entity: RentalEntity): Rental {
    return {
        id: entity.id,
        advertisementId: entity.advertisementId,
        renterId: entity.renterId,
        totalPrice: entity.totalPrice,
        startDate: entity.startDate,
        endDate: entity.endDate,
    };
}

export function toRentalResponseModel(rental: Rental): RentalResponseDto {
    return {
        id: rental.id,
        advertisementId: rental.advertisementId,
        renterId: rental.renterId,
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

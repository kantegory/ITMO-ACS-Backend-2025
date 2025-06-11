import { ResponsePropertyDto, CreatePropertyDto } from "../dtos/PropertyDtos";
import { Property } from "../models/PropertyModel";
import { RentMapper } from "./RentMapper";
import { Rent } from "../models/RentModel";


export class PropertyMapper {
    static toDto(model: Property, withRents: boolean = false): ResponsePropertyDto {
        const { rents, ...rest } = model
        const dto = new ResponsePropertyDto(rest)
        if (withRents) dto.rents = rents?.map((rent: Rent) => RentMapper.toDto(rent))
        return dto
    }

    static toModel(dto: CreatePropertyDto): Property {
        const { ...params } = dto
        const model = new Property(params)
        return model
    }
}

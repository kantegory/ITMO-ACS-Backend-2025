import { Rent } from "../models/RentModel";
import { ResponseRentDto, CreateRentDto } from "../dtos/RentDtos";
import { Property } from "../models/PropertyModel";


export class RentMapper {
    static toDto(model: Rent): ResponseRentDto {
        const { property, ...rest} = model
        const dto = new ResponseRentDto(rest)
        if (property)
            dto.propertyId = property.id
        return dto
    }

    static toModel(dto: CreateRentDto): Rent {
        const { propertyId, ...rest} = dto
        const model = new Rent(rest)
        model.property = { id: propertyId } as Property
        return model
    }
}

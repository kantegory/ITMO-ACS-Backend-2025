import { Rent } from "../models/RentModel";
import { ResponseRentDto, CreateRentDto } from "../dtos/RentDtos";
import { Property } from "../models/PropertyModel";
import { User } from "../models/UserModel"; 


export class RentMapper {
    static toDto(model: Rent): ResponseRentDto {
        const { property, renting, ...rest} = model
        const dto = new ResponseRentDto(rest)
        dto.propertyId = property.id
        dto.rentingId = renting.id
        return dto
    }

    static toModel(dto: CreateRentDto): Rent {
        const { propertyId, rentingId, ...rest} = dto
        const model = new Rent(rest)
        model.property = { id: propertyId } as Property
        model.renting = { id: rentingId } as User
        return model
    }
}

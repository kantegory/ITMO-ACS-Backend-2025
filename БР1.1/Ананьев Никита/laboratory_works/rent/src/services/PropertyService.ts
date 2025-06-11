import { Service, Inject } from 'typedi';
import { CreatePropertyDto, ResponsePropertyDto, PropertyFilterDto } from "../dtos/PropertyDtos"
import { Property } from "../models/PropertyModel"
import { PropertyMapper } from "../mappers/PropertyMapper"
import { FindManyOptions, MoreThan, LessThan, Like } from "typeorm"
import { NotFoundError } from "../errors/NotFoundError"
import { Repository } from "typeorm"
import { CreationError } from "../errors/CreationError"


export interface IPropertyService {
    register(propertyData: CreatePropertyDto): Promise<ResponsePropertyDto>
    filter(filterData: PropertyFilterDto): Promise<ResponsePropertyDto[]>
    findById(id: number): Promise<ResponsePropertyDto>
}


@Service('IPropertyService')
export class PropertyService implements IPropertyService{
    constructor(
        @Inject('property.repository')
        protected readonly repository: Repository<Property>
    ) {}

    async register(propertyData: CreatePropertyDto): Promise<ResponsePropertyDto> {
        let property: Property = PropertyMapper.toModel(propertyData)
        try {
            property = await this.repository.save(property)
            return PropertyMapper.toDto(property)
        } catch (error: any) {
            console.log(error)
            throw new CreationError("Property creation failed")
        }
    }

    async filter(filterData: PropertyFilterDto): Promise<ResponsePropertyDto[]> {
        const findOptions: FindManyOptions<Property> = {
            where: {
                area: this.buildAreaCondition(filterData),
                address: filterData.address ? Like(`%${filterData.address}%`) : undefined,
                description: filterData.description ? Like(`%${filterData.description}%`) : undefined,
            },
        }
        const results: Property[] = await this.repository.find(findOptions)
        return results.map(r => PropertyMapper.toDto(r))
    }

    async findById(id: number): Promise<ResponsePropertyDto> {
        const result = await this.repository.findOneBy({id: id})
        if (result == null)
            throw new NotFoundError(`No property found with id=${id}`)
        return PropertyMapper.toDto(result);
    }

    private buildAreaCondition(filter: PropertyFilterDto) {
        if (filter.minArea) {
            return MoreThan(filter.minArea);
        }
        if (filter.maxArea) {
            return LessThan(filter.maxArea);
        }
        return undefined;
    }
}

import { dataSource } from '../DataSource';
import { Property } from '../models/Property';
import { CreatePropertyDto, UpdatePropertyDto } from '../dto/PropertyDto';

const propertyRepo = dataSource.getRepository(Property);

export const createProperty = async (dto: CreatePropertyDto) => {
    const { owner_id, ...rest } = dto;
    const entity = propertyRepo.create({ ...rest, owner: { user_id: owner_id } });
    return propertyRepo.save(entity);
};

export const getAllProperties = () =>
    propertyRepo.find({ relations: ['owner', 'photos', 'bookings'] });

export const getPropertyById = (id: number) =>
    propertyRepo.findOne({
    where: { property_id: id },
    relations: ['owner', 'photos', 'bookings'],
});

export const updateProperty = async (id: number, dto: UpdatePropertyDto) => {
    await propertyRepo.update({ property_id: id }, dto);
    return getPropertyById(id);
};

export const deleteProperty = (id: number) =>
    propertyRepo.delete({ property_id: id });
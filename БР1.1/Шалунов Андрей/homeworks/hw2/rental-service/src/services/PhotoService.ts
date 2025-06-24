import { dataSource } from '../DataSource';
import { PropertyPhoto }  from '../models/PropertyPhoto';
import { CreatePhotoDto, UpdatePhotoDto } from '../dto/PhotoDto';

const repo = dataSource.getRepository(PropertyPhoto);

export const createPhoto = async (dto: CreatePhotoDto) => {
    const { property_id, ...rest } = dto;
    const entity = repo.create({
        ...rest,
        property: { property_id },
    });
    return repo.save(entity);
};

export const getAllPhotos = () =>
    repo.find({ relations: ['property'] });

export const getPhotoById = (id: number) =>
    repo.findOne({
        where: { photo_id: id },
        relations: ['property'],
    });

export const updatePhoto = async (id: number, dto: UpdatePhotoDto) => {
    await repo.update({ photo_id: id }, dto);
    return getPhotoById(id);
};

export const deletePhoto = (id: number) =>
    repo.delete({ photo_id: id });
import dataSource from "../config/data-source";
import {AdvertisementEntity} from "../entities/advertisement.entity";
import {Advertisement} from "../models/models/advertisement.model";
import {EntityNotFoundError, userServiceClient} from "@rent/shared";
import {CreateAdvertisementModel} from "../models/requests/advertisement/advertisement-create-request.model";
import {CategoryEntity} from "../entities/category.entity";
import propertyService from "./property.service";
import rulesService from "./rules.service";
import photoService from "./photo.service";
import {Photo} from "../models/models/photo.model";
import {CreatePhotoModel} from "../models/requests/photo/photo-create-request.model";
import {UpdateAdvertisementModel} from "../models/requests/advertisement/advertisement-update-request.model";
import {entityToAdvertisement} from "../mappers/advertisement.mapper";

class AdvertisementService {
    private repo = dataSource.getRepository(AdvertisementEntity);

    async getAll(): Promise<Advertisement[]> {
        const entities = await this.repo.find({
            relations: [
                "category",
                "property",
                "property.living",
                "property.living.comfort",
                "property.living.flat",
                "property.living.room",
                "property.living.countryHouse",
                "rules",
                "photos"
            ]
        });
        return entities.map(entityToAdvertisement);
    }

    async getById(id: number): Promise<Advertisement> {
        const entity = await this.repo.findOne({
            where: {id},
            relations: [
                "category",
                "property",
                "property.living",
                "property.living.comfort",
                "property.living.flat",
                "property.living.room",
                "property.living.countryHouse",
                "rules",
                "photos"
            ]
        });
        if (!entity) throw new EntityNotFoundError(AdvertisementEntity, id, "id");
        return entityToAdvertisement(entity);
    }

    async create(model: CreateAdvertisementModel, ownerId: number): Promise<Advertisement> {
        const category = await dataSource.getRepository(CategoryEntity).findOneByOrFail({id: model.categoryId});

        const advertisement = this.repo.create({
            ownerId: ownerId,
            category,
            title: model.title,
            description: model.description,
            rentType: model.rentType,
            pricePerPeriod: model.pricePerPeriod,
            commission: model.commission,
            deposit: model.deposit,
        });
        const createdAdvertisement = await this.repo.save(advertisement);
        await propertyService.create(createdAdvertisement, model.property);
        await rulesService.create(createdAdvertisement, model.rules);
        await photoService.createMany(createdAdvertisement, model.photos);
        return this.getById(createdAdvertisement.id);
    }

    async getPhotosByAdvertisementId(advertisementId: number): Promise<Photo[]> {
        return await photoService.getPhotosByAdvertisementId(advertisementId);
    }


    async addPhotoToAdvertisement(advertisementId: number, data: CreatePhotoModel): Promise<Photo> {
        return await photoService.create(advertisementId, data);
    }

    async update(id: number, model: UpdateAdvertisementModel): Promise<Advertisement> {
        const ad = await this.repo.findOneBy({id});
        if (!ad) throw new EntityNotFoundError(AdvertisementEntity, id, "id");
        Object.assign(ad, model);
        await this.repo.save(ad);
        return this.getById(id);
    }

    async delete(id: number): Promise<void> {
        const ad = await this.repo.findOneBy({id});
        if (!ad) throw new EntityNotFoundError(AdvertisementEntity, id, "id");
        await this.repo.remove(ad);
    }
}

export default new AdvertisementService();

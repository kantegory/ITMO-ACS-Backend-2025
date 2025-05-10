import dataSource from "../config/data-source";
import {AdvertisementEntity} from "../entities/advertisement.entity";
import {Advertisement} from "../models/models/advertisement.model";
import {entityToAdvertisement} from "../mappers/advertisement.mapper";
import EntityNotFoundError from "../errors/entity-not-found.error";

import {UserEntity} from "../entities/user.entity";
import {CategoryEntity} from "../entities/category.entity";
import propertyService from "./property.service";
import rulesService from "./rules.service";
import photoService from "./photo.service";
import {CreateAdvertisementModel} from "../models/requests/advertisement/advertisement-create-request.model";
import {UpdateAdvertisementModel} from "../models/requests/advertisement/advertisement-update-request.model";
import rentalService from "./rental.service";
import {Rental} from "../models/models/rental.model";
import {Photo} from "../models/models/photo.model";
import {CreatePhotoModel} from "../models/requests/photo/photo-create-request.model";
import messageService from "./message.service";
import {Message} from "../models/models/message.model";

class AdvertisementService {
    private repo = dataSource.getRepository(AdvertisementEntity);

    async getAll(): Promise<Advertisement[]> {
        const entities = await this.repo.find({
            relations: [
                "owner",
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

    async getRentalsByAdvertisementId(advertisementId: number): Promise<Rental[]> {
        return await rentalService.getRentalsByAdvertisementId(advertisementId)
    }

    async getById(id: number): Promise<Advertisement> {
        const entity = await this.repo.findOne({
            where: {id},
            relations: [
                "owner",
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

    async create(model: CreateAdvertisementModel): Promise<Advertisement> {
        const owner = await dataSource.getRepository(UserEntity).findOneByOrFail({id: model.ownerId});
        const category = await dataSource.getRepository(CategoryEntity).findOneByOrFail({id: model.categoryId});

        const advertisement = this.repo.create({
            owner,
            category,
            title: model.title,
            description: model.description,
            rentType: model.rentType,
            pricePerPeriod: model.pricePerPeriod,
            commission: model.commission,
            deposit: model.deposit,
        });
        console.log(advertisement.id)
        const createdAdvertisement = await this.repo.save(advertisement);
        console.log(createdAdvertisement.id)
        await propertyService.create(createdAdvertisement, model.property);
        await rulesService.create(createdAdvertisement, model.rules);
        await photoService.createMany(createdAdvertisement, model.photos);
        console.log(createdAdvertisement.id)
        return this.getById(createdAdvertisement.id);
    }

    async getPhotosByAdvertisementId(advertisementId: number): Promise<Photo[]> {
        return await photoService.getPhotosByAdvertisementId(advertisementId);
    }

    async getMessagesForAdvertisement(advertisementId: number): Promise<Message[]> {
        return await messageService.getMessagesForAdvertisement(advertisementId);
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

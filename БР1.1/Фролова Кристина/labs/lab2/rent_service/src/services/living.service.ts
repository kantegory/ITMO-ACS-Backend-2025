import dataSource from '../config/data-source';
import {LivingEntity} from "../entities/living.entity";
import {CreateLivingModel} from "../models/requests/living/living-create-request.model";
import {PropertyEntity} from "../entities/property.entity";
import comfortService from "./comfort.service";
import flatService from "./flat.service";
import roomService from "./room.service";
import countryHouseService from "./country-house.service";

class LivingService {
    private repository = dataSource.getRepository(LivingEntity);

    async create(property: PropertyEntity, model: CreateLivingModel): Promise<void> {
        const living = this.repository.create({
            property,
            totalFloors: model.totalFloors,
            totalRooms: model.totalRooms,
            area: model.area,
            meter: model.meter,
            other: model.other,
            livingType: model.livingType,
        });
        await living.save();
        await comfortService.create(living, model.comfort);
        if (model.flat) {
            await flatService.create(living, model.flat);
        }
        if (model.room) {
            await roomService.create(living, model.room);
        }
        if (model.countryHouse) {
            await countryHouseService.create(living, model.countryHouse);
        }
    }
}

export default new LivingService();

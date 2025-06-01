import dataSource from '../config/data-source';
import {RulesEntity} from "../entities/rules.entity";
import {AdvertisementEntity} from "../entities/advertisement.entity";
import {CreateRulesModel} from "../models/requests/rules/rules-create-request.model";

class RulesService {
    private repository = dataSource.getRepository(RulesEntity);

    async create(advertisement: AdvertisementEntity, model: CreateRulesModel): Promise<void> {
        const rules = this.repository.create({
            advertisement,
            checkInAfter: model.checkInAfter,
            departureBefore: model.departureBefore,
            guestCount: model.guestCount,
            withChildren: model.withChildren,
            withAnimals: model.withAnimals,
            allowedSmoking: model.allowedSmoking,
            allowedParties: model.allowedParties,
            report_docs: model.report_docs,
        });
        await rules.save();
    }
}

export default new RulesService();

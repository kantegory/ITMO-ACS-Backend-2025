import {RulesEntity} from "../entities/rules.entity";
import {Rules} from "../models/models/rules.model";
import {RulesResponseDto} from "@rent/shared";
import {CreateRulesModel} from "../models/requests/rules/rules-create-request.model";
import {CreateRulesRequestDto} from "../models/requests/rules/rules-create-request.dto";

export function createRulesDtoToModel(dto: CreateRulesRequestDto): CreateRulesModel {
    return {
        checkInAfter: new Date(dto.checkInAfter),
        departureBefore: new Date(dto.departureBefore),
        guestCount: dto.guestCount,
        withChildren: dto.withChildren,
        withAnimals: dto.withAnimals,
        allowedSmoking: dto.allowedSmoking,
        allowedParties: dto.allowedParties,
        report_docs: dto.report_docs,
    };
}

export function entityToRules(entity: RulesEntity): Rules {
    return {
        id: entity.id,
        checkInAfter: entity.checkInAfter,
        departureBefore: entity.departureBefore,
        guestCount: entity.guestCount,
        withChildren: entity.withChildren,
        withAnimals: entity.withAnimals,
        allowedSmoking: entity.allowedSmoking,
        allowedParties: entity.allowedParties,
        report_docs: entity.report_docs,
    };
}


export function toRulesResponseModel(rules: Rules): RulesResponseDto {
    return {
        id: rules.id,
        checkInAfter: rules.checkInAfter,
        departureBefore: rules.departureBefore,
        guestCount: rules.guestCount,
        withChildren: rules.withChildren,
        withAnimals: rules.withAnimals,
        allowedSmoking: rules.allowedSmoking,
        allowedParties: rules.allowedParties,
        report_docs: rules.report_docs,
    };
}
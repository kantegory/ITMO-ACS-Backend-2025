import { CoachEntity } from "../coach.entity";
import { CoachModel } from "../../../../../../application/domain/coach.model";
import { UserMapper } from "./user.mapper";
import { AthleteMapper } from "./athlete.mapper";

export class CoachMapper {
    static toDomain(entity: CoachEntity): CoachModel {
        const coach = new CoachModel(
            entity.id,
            UserMapper.toDomain(entity.user)
        );

        // Map athletes
        if (entity.athletes) {
            entity.athletes.forEach(athleteEntity => {
                const athlete = AthleteMapper.toDomain(athleteEntity);
                coach.assignAthlete(athlete);
            });
        }

        return coach;
    }

    static toEntity(model: CoachModel): CoachEntity {
        const entity = new CoachEntity();
        entity.id = model.id;
        entity.user = UserMapper.toEntity(model.user);
        
        // Map athletes
        if (model.athletes) {
            entity.athletes = model.athletes.map(athlete => AthleteMapper.toEntity(athlete));
        }

        return entity;
    }
} 
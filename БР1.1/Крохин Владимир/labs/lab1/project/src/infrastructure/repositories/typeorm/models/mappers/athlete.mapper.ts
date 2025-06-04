import { AthleteEntity } from "../athlete.entity";
import { AthleteModel } from "../../../../../../application/domain/athlete.model";
import { UserMapper } from "./user.mapper";
import { CoachMapper } from "./coach.mapper";
import { TrainingMapper } from "./training.mapper";

export class AthleteMapper {
    static toDomain(entity: AthleteEntity): AthleteModel {
        const athlete = new AthleteModel(
            entity.id,
            UserMapper.toDomain(entity.user)
        );

        // Map coaches
        if (entity.coaches) {
            entity.coaches.forEach(coachEntity => {
                const coach = CoachMapper.toDomain(coachEntity);
                athlete.assignCoach(coach);
            });
        }

        // Map trainings
        if (entity.trainings) {
            entity.trainings.forEach(trainingEntity => {
                const training = TrainingMapper.toDomain(trainingEntity);
                athlete.assignTraining(training);
            });
        }

        return athlete;
    }

    static toEntity(model: AthleteModel): AthleteEntity {
        const entity = new AthleteEntity();
        entity.id = model.id;
        entity.user = UserMapper.toEntity(model.user);
        
        // Map coaches
        if (model.coaches) {
            entity.coaches = model.coaches.map(coach => CoachMapper.toEntity(coach));
        }

        // Map trainings
        if (model.trainings) {
            entity.trainings = model.trainings.map(training => TrainingMapper.toEntity(training));
        }

        return entity;
    }
} 
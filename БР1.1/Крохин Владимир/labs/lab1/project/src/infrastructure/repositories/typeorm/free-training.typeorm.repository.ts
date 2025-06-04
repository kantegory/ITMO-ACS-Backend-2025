import { Repository, DataSource } from "typeorm";
import { FreeTrainingEntity } from "./models/free-training.entity";
import { FreeTrainingRepository } from "../interfaces/free-training.repository";
import { FreeTrainingModel } from "../../../application/domain/free-training.model";
import { FreeTrainingMapper } from "./models/mappers/free-training.mapper";

export class FreeTrainingTypeOrmRepository implements FreeTrainingRepository {
    private ormRepository: Repository<FreeTrainingEntity>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(FreeTrainingEntity);
    }

    async findById(id: number): Promise<FreeTrainingModel | null> {
        const entity = await this.ormRepository.findOne({ where: { id } });
        if (!entity) return null;
        return FreeTrainingMapper.toDomain(entity);
    }

    async findAllByUser(userId: number): Promise<FreeTrainingModel[]> {
        const entities = await this.ormRepository.find({ where: { athlete_id: userId } });
        return entities.map(FreeTrainingMapper.toDomain);
    }

    async save(training: FreeTrainingModel): Promise<FreeTrainingModel> {
        const entity = FreeTrainingMapper.toEntity(training);
        const saved = await this.ormRepository.save(entity);
        return FreeTrainingMapper.toDomain(saved);
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
} 
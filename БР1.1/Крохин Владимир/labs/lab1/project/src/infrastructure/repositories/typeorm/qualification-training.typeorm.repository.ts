import { Repository, DataSource } from "typeorm";
import { QualificationTrainingEntity } from "./models/qualification-training.entity";
import { QualificationTrainingRepository } from "../interfaces/qualification-training.repository";
import { QualificationTrainingModel } from "../../../application/domain/qualification-training.model";
import { QualificationTrainingMapper } from "./models/mappers/qualification-training.mapper";

export class QualificationTrainingTypeOrmRepository implements QualificationTrainingRepository {
    private ormRepository: Repository<QualificationTrainingEntity>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(QualificationTrainingEntity);
    }

    async findById(id: number): Promise<QualificationTrainingModel | null> {
        const entity = await this.ormRepository.findOne({ where: { id } });
        if (!entity) return null;
        return QualificationTrainingMapper.toDomain(entity);
    }

    async findAllByUser(userId: number): Promise<QualificationTrainingModel[]> {
        const entities = await this.ormRepository.find({ where: { athlete_id: userId } });
        return entities.map(QualificationTrainingMapper.toDomain);
    }

    async save(training: QualificationTrainingModel): Promise<QualificationTrainingModel> {
        const entity = QualificationTrainingMapper.toEntity(training);
        const saved = await this.ormRepository.save(entity);
        return QualificationTrainingMapper.toDomain(saved);
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
} 
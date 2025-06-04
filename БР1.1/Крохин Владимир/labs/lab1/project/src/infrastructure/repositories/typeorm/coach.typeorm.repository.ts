import { Repository, DataSource } from "typeorm";
import { CoachEntity } from "./models/coach.entity";
import { CoachRepository } from "../interfaces/coach.repository";
import { CoachModel } from "../../domain/coach.model";
import { CoachMapper } from "./models/mappers/coach.mapper";

export class CoachTypeOrmRepository implements CoachRepository {
    private ormRepository: Repository<CoachEntity>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(CoachEntity);
    }

    async findById(id: number): Promise<CoachModel | null> {
        const entity = await this.ormRepository.findOne({ where: { id } });
        if (!entity) return null;
        return CoachMapper.toDomain(entity);
    }

    async findByUserId(userId: number): Promise<CoachModel | null> {
        const entity = await this.ormRepository.findOne({ where: { user_id: userId } });
        if (!entity) return null;
        return CoachMapper.toDomain(entity);
    }

    async findAll(): Promise<CoachModel[]> {
        const entities = await this.ormRepository.find();
        return entities.map(CoachMapper.toDomain);
    }

    async save(coach: CoachModel): Promise<CoachModel> {
        const entity = CoachMapper.toEntity(coach);
        const saved = await this.ormRepository.save(entity);
        return CoachMapper.toDomain(saved);
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
} 
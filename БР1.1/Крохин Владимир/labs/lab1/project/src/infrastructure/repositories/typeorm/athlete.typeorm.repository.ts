import { Repository, DataSource } from "typeorm";
import { AthleteEntity } from "./models/athlete.entity";
import { AthleteRepository } from "../interfaces/athlete.repository";
import { AthleteModel } from "../../domain/athlete.model";
import { AthleteMapper } from "./models/mappers/athlete.mapper";

export class AthleteTypeOrmRepository implements AthleteRepository {
    private ormRepository: Repository<AthleteEntity>;

    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(AthleteEntity);
    }

    async findById(id: number): Promise<AthleteModel | null> {
        const entity = await this.ormRepository.findOne({ where: { id } });
        if (!entity) return null;
        return AthleteMapper.toDomain(entity);
    }

    async findByUserId(userId: number): Promise<AthleteModel | null> {
        const entity = await this.ormRepository.findOne({ where: { user_id: userId } });
        if (!entity) return null;
        return AthleteMapper.toDomain(entity);
    }

    async findAll(): Promise<AthleteModel[]> {
        const entities = await this.ormRepository.find();
        return entities.map(AthleteMapper.toDomain);
    }

    async save(athlete: AthleteModel): Promise<AthleteModel> {
        const entity = AthleteMapper.toEntity(athlete);
        const saved = await this.ormRepository.save(entity);
        return AthleteMapper.toDomain(saved);
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
} 
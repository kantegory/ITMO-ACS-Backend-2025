import { Repository, DataSource } from "typeorm";
import { SeriesEntity } from "./models/series.entity";
import { SeriesRepository } from "../interfaces/series.repository";
import { SeriesModel } from "../../domain/series.model";
import { SeriesMapper } from "./models/mappers/series.mapper";

export class SeriesTypeOrmRepository implements SeriesRepository {
  private ormRepository: Repository<SeriesEntity>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(SeriesEntity);
  }

  async findById(id: number): Promise<SeriesModel | null> {
    const entity = await this.ormRepository.findOne({ where: { id } });
    if (!entity) return null;
    return SeriesMapper.toDomain(entity);
  }

  async findAllByTraining(trainingId: number): Promise<SeriesModel[]> {
    const entities = await this.ormRepository.find({ where: { training_id: trainingId } });
    return entities.map(SeriesMapper.toDomain);
  }

  async save(series: SeriesModel): Promise<SeriesModel> {
    const entity = SeriesMapper.toEntity(series);
    const saved = await this.ormRepository.save(entity);
    return SeriesMapper.toDomain(saved);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
} 
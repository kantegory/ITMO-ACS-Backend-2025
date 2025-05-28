import { Repository, DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { dataSource } from "../data-source";

export abstract class BaseService<Entity> {
  protected repository: Repository<Entity>;

  constructor(entity: { new (): Entity }) {
    this.repository = dataSource.getRepository(entity);
  }

  async findAll(relations: string[] = []): Promise<Entity[]> {
    return this.repository.find({ relations });
  }

  async findOne(id: number, relations: string[] = []): Promise<Entity | null> {
    return this.repository.findOne({ where: { id } as any, relations });
  }

  async create(data: DeepPartial<Entity>): Promise<Entity> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: QueryDeepPartialEntity<Entity>): Promise<Entity | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

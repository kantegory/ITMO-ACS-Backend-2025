import { Repository, DataSource } from "typeorm";
import { UserEntity } from "./models/user.entity";
import { UserRepository } from "../interfaces/user.repository";
import { UserModel } from "../../../application/domain/user.model";
import { UserMapper } from "./models/mappers/user.mapper";

export class UserTypeOrmRepository implements UserRepository {
  private ormRepository: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(UserEntity);
  }

  async findById(id: number): Promise<UserModel | null> {
    const entity = await this.ormRepository.findOne({ where: { id } });
    if (!entity) return null;
    return UserMapper.toDomain(entity);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const entity = await this.ormRepository.findOne({ where: { email } });
    if (!entity) return null;
    return UserMapper.toDomain(entity);
  }

  async findByUsername(username: string): Promise<UserModel | null> {
    const entity = await this.ormRepository.findOne({ where: { username } });
    if (!entity) return null;
    return UserMapper.toDomain(entity);
  }

  async save(user: UserModel): Promise<UserModel> {
    const entity = UserMapper.toEntity(user);
    const saved = await this.ormRepository.save(entity);
    return UserMapper.toDomain(saved);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
} 
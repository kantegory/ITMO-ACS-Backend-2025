import { BaseService } from "../common/baseService";
import { User } from "../entities/User";
import { hashPassword } from "../utils/hashPassword";

export class UserService extends BaseService<User> {
  constructor() {
    super(User);
  }

  async findAllWithRelations() {
    return this.repository.find({ relations: ["role"] });
  }

  async findOneWithRelations(id: number) {
    return this.repository.findOne({ where: { id }, relations: ["role"] });
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ where: { email }, relations: ["role"] });
  }

  override async create(data: Partial<User>) {
    const user = this.repository.create({
      ...data,
      password_hash: hashPassword(data.password_hash || ""), // Хешируем пароль при создании
    });
    return this.repository.save(user);
  }
}

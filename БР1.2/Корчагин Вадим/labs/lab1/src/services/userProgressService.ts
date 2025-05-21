import { BaseService } from "../common/baseService";
import { UserProgress } from "../entities/UserProgress";

export class UserProgressService extends BaseService<UserProgress> {
  constructor() {
    super(UserProgress);
  }

  async findAllWithRelations() {
    return this.repository.find({ relations: ["user"] });
  }

  async findOneWithRelations(id: number) {
    return this.repository.findOne({ where: { id }, relations: ["user"] });
  }
}

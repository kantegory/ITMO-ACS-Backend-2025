import { BaseService } from "../common/baseService";
import { UserTrainingPlan } from "../entities/UserTrainingPlan";
import axios from "axios";

export class UserTrainingPlanService extends BaseService<UserTrainingPlan> {
  constructor() {
    super(UserTrainingPlan);
  }

  async findAllWithRelations() {
    const list = await this.repository.find({ relations: ["training_plan"] });
    return await Promise.all(
      list.map(async (item) => {
        const user = await this.fetchUser(item.user_id);
        return { ...item, user };
      })
    );
  }

  async findOneWithRelations(id: number) {
    const item = await this.repository.findOne({ where: { id }, relations: ["training_plan"] });
    if (!item) return null;

    const user = await this.fetchUser(item.user_id);
    return { ...item, user };
  }

  private async fetchUser(userId: number) {
    try {
      const res = await axios.get(`http://localhost:3000/users/id/${userId}`);
      return res.data;
    } catch {
      return null;
    }
  }
}

import { BaseService } from "../common/baseService";
import { UserProgress } from "../entities/UserProgress";
import axios from "axios";
import { config } from "dotenv";

config();

const host = process.env.AUTH_HOST;
const port = parseInt(process.env.AUTH_PORT);
export class UserProgressService extends BaseService<UserProgress> {
  constructor() {
    super(UserProgress);
  }

  async findAllWithRelations() {
    const list = await this.repository.find();
    return await Promise.all(
      list.map(async (progress) => {
        const user = await this.fetchUser(progress.user_id);
        return { ...progress, user };
      })
    );
  }

  async findOneWithRelations(id: number) {
    const progress = await this.repository.findOne({ where: { id } });
    if (!progress) return null;

    const user = await this.fetchUser(progress.user_id);
    return { ...progress, user };
  }

  private async fetchUser(userId: number) {
    try {
      const res = await axios.get(`http://${host}:${port}/users/id/${userId}`);
      return res.data;
    } catch {
      return null;
    }
  }
  async createFromOrder(data: { userId: string }) {
    const progress = await this.create({
      user_id: parseInt(data.userId),
    });
    console.log("📦 Progress created from order:", progress);
  }
}

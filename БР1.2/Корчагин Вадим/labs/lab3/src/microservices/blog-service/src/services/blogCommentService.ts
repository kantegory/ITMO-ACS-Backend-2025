import { BaseService } from "../common/baseService";
import { BlogComment } from "../entities/BlogComment";
import axios from "axios";

import { config } from "dotenv";

config();

const host = process.env.AUTH_HOST;
const port = parseInt(process.env.AUTH_PORT);

export class BlogCommentService extends BaseService<BlogComment> {
  constructor() {
    super(BlogComment);
  }

  async findAllWithRelations() {
    const comments = await this.repository.find({ relations: ["post"] });

    return await Promise.all(
      comments.map(async (comment) => {
        const user = await this.fetchUser(comment.user_id);
        return { ...comment, user };
      })
    );
  }

  async findOneWithRelations(id: number) {
    const comment = await this.repository.findOne({
      where: { id },
      relations: ["post"],
    });
    if (!comment) return null;

    const user = await this.fetchUser(comment.user_id);
    return { ...comment, user };
  }

  private async fetchUser(userId: number) {
    try {
      const response = await axios.get(`http://${host}:${port}/users/id/${userId}`);
      return response.data;
    } catch {
      return null;
    }
  }
}

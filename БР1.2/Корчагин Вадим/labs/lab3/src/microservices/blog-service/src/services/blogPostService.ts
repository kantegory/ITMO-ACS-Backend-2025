import { BaseService } from "../common/baseService";
import { BlogPost } from "../entities/BlogPost";
import axios from "axios";
import { config } from "dotenv";

config();

const host = process.env.AUTH_HOST;
const port = parseInt(process.env.AUTH_PORT);
export class BlogPostService extends BaseService<BlogPost> {
  constructor() {
    super(BlogPost);
  }

  async findAllWithRelations() {
    const posts = await this.repository.find({ relations: ["comments"] });

    return await Promise.all(
      posts.map(async (post) => {
        const author = await this.fetchUser(post.author_id);
        return { ...post, author };
      })
    );
  }

  async findOneWithRelations(id: number) {
    const post = await this.repository.findOne({
      where: { id },
      relations: ["comments"],
    });
    if (!post) return null;

    const author = await this.fetchUser(post.author_id);
    return { ...post, author };
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

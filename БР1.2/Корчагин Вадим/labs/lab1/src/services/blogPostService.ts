import { BaseService } from "../common/baseService";
import { BlogPost } from "../entities/BlogPost";

export class BlogPostService extends BaseService<BlogPost> {
  constructor() {
    super(BlogPost);
  }

  async findAllWithRelations() {
    return this.repository.find({ relations: ["author"] });
  }

  async findOneWithRelations(id: number) {
    return this.repository.findOne({ where: { id }, relations: ["author"] });
  }
}

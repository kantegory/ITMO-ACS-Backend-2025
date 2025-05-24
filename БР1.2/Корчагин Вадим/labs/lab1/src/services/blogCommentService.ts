import { BaseService } from "../common/baseService";
import { BlogComment } from "../entities/BlogComment";

export class BlogCommentService extends BaseService<BlogComment> {
  constructor() {
    super(BlogComment);
  }

  async findAllWithRelations() {
    return this.repository.find({ relations: ["user", "post"] });
  }

  async findOneWithRelations(id: number) {
    return this.repository.findOne({ where: { id }, relations: ["user", "post"] });
  }
}

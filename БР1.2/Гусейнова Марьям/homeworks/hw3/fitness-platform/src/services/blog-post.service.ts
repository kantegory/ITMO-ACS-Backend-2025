import { AppDataSource } from '../data-source';
import { BlogPost } from '../models/BlogPost';

export class BlogPostService {
  private blogPostRepository = AppDataSource.getRepository(BlogPost);

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPostRepository.find();
  }

  async getBlogPostById(id: number): Promise<BlogPost | null> {
    return this.blogPostRepository.findOneBy({ post_id: id });
  }

  async createBlogPost(blogPostData: Partial<BlogPost>): Promise<BlogPost> {
    const blogPost = this.blogPostRepository.create(blogPostData);
    return this.blogPostRepository.save(blogPost);
  }

  async updateBlogPost(id: number, blogPostData: Partial<BlogPost>): Promise<BlogPost | null> {
    const blogPost = await this.blogPostRepository.findOneBy({ post_id: id });
    if (blogPost) {
      this.blogPostRepository.merge(blogPost, blogPostData);
      return this.blogPostRepository.save(blogPost);
    }
    return null;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await this.blogPostRepository.delete(id);
    return !!result.affected;
  }
}
import { AppDataSource } from '../data-source';
import { BlogPost } from '../models/BlogPost';
import { CustomError } from '../utils/custom-error.util';
import { Theme } from '../enums/Theme';

export class BlogPostService {
  private blogPostRepository = AppDataSource.getRepository(BlogPost);

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPostRepository.find();
  }

  async getBlogPostById(id: number): Promise<BlogPost> {
    const blogPost = await this.blogPostRepository.findOneBy({ post_id: id });
    if (!blogPost) {
      throw new CustomError('Blog post not found', 404);
    }
    return blogPost;
  }

  async createBlogPost(blogPostData: Partial<BlogPost>): Promise<BlogPost> {
    // Валидация обязательных полей
    if (!blogPostData.author || !blogPostData.title || !blogPostData.content || !blogPostData.theme) {
      throw new CustomError('Missing required fields: author, title, content, theme', 400);
    }

    // Валидация значения enum Theme
    if (!(Object.values(Theme).includes(blogPostData.theme as Theme))) {
        throw new CustomError(`Invalid theme value: ${blogPostData.theme}. Allowed themes are: ${Object.values(Theme).join(', ')}`, 400);
    }

    const blogPost = this.blogPostRepository.create(blogPostData);
    return this.blogPostRepository.save(blogPost);
  }

  async updateBlogPost(id: number, blogPostData: Partial<BlogPost>): Promise<BlogPost> {
    const blogPost = await this.blogPostRepository.findOneBy({ post_id: id });
    if (!blogPost) {
      throw new CustomError('Blog post not found', 404);
    }

    // Валидация значения enum Theme, если оно передано для обновления
    if (blogPostData.theme && !(Object.values(Theme).includes(blogPostData.theme as Theme))) {
        throw new CustomError(`Invalid theme value: ${blogPostData.theme}. Allowed themes are: ${Object.values(Theme).join(', ')}`, 400);
    }

    this.blogPostRepository.merge(blogPost, blogPostData);
    return this.blogPostRepository.save(blogPost);
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const blogPostToDelete = await this.blogPostRepository.findOneBy({ post_id: id });
    if (!blogPostToDelete) {
      throw new CustomError('Blog post not found', 404);
    }

    const result = await this.blogPostRepository.delete(id);
    return !!result.affected;
  }
}
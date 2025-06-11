import {
  Get, Post, Patch, Delete, Param, Body, Authorized, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { BlogPost } from "../entities/BlogPost";
import { CreateBlogPostDto } from "../dto/blogPost/create-blog-post.dto";
import { UpdateBlogPostDto } from "../dto/blogPost/update-blog-post.dto";
import { BlogPostResponseDto } from "../dto/blogPost/blog-post-response.dto";
import { BlogPostService } from "../services/blogPostService";
import { BaseController } from "../common/baseController";

@JsonController("/blog-posts")
export class BlogPostController extends BaseController<BlogPost> {
  private readonly blogPostService: BlogPostService;

  constructor() {
    super(new BlogPostService());
    this.blogPostService = this.service as BlogPostService;
  }

  @Get("/")
  @OpenAPI({ summary: "Get all blog posts" })
  @ResponseSchema(BlogPostResponseDto, { isArray: true })
  async getAll() {
    return this.blogPostService.findAllWithRelations();
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get blog post by ID" })
  @ResponseSchema(BlogPostResponseDto)
  async getById(@Param("id") id: number) {
    const post = await this.blogPostService.findOneWithRelations(id);
    if (!post) {
      return { error: "Not found" };
    }
    return post;
  }

  @Post("/")
  @OpenAPI({ summary: "Create a new blog post" })
  @ResponseSchema(BlogPostResponseDto)
  async create(@Body({ required: true }) data: CreateBlogPostDto) {
    return this.blogPostService.create(data);
  }

  @Patch("/:id")
  @OpenAPI({ summary: "Update a blog post" })
  @ResponseSchema(BlogPostResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) data: UpdateBlogPostDto) {
    const updated = await this.blogPostService.update(id, data);
    if (!updated) {
      return { error: "Not found" };
    }
    return updated;
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete a blog post" })
  async remove(@Param("id") id: number) {
    await this.blogPostService.remove(id);
    return { message: "Deleted successfully" };
  }
}
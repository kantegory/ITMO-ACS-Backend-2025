import {
  Get, Post, Patch, Delete, Param, Body, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { BlogComment } from "../entities/BlogComment";
import { CreateBlogCommentDto } from "../dto/blogComment/create-blog-comment.dto";
import { UpdateBlogCommentDto } from "../dto/blogComment/update-blog-comment.dto";
import { BlogCommentResponseDto } from "../dto/blogComment/blog-comment-response.dto";
import { BlogCommentService } from "../services/blogCommentService";
import { BaseController } from "../common/baseController";

@JsonController("/blog-comments")
export class BlogCommentController extends BaseController<BlogComment> {
  private readonly blogCommentService: BlogCommentService;

  constructor() {
    super(new BlogCommentService());
    this.blogCommentService = this.service as BlogCommentService;
  }

  @Get("/")
  
  @OpenAPI({ summary: "Get all blog comments" })
  @ResponseSchema(BlogCommentResponseDto, { isArray: true })
  async getAll(): Promise<BlogCommentResponseDto[]> {
    return this.blogCommentService.findAllWithRelations();
  }

  @Get("/:id")
  
  @OpenAPI({ summary: "Get blog comment by ID" })
  @ResponseSchema(BlogCommentResponseDto)
  async getById(@Param("id") id: number): Promise<BlogCommentResponseDto | { error: string }> {
    const item = await this.blogCommentService.findOneWithRelations(id);
    if (!item) {
      return { error: "Not found" };
    }
    return item;
  }

  @Post("/")
  
  @OpenAPI({ summary: "Create a new blog comment" })
  @ResponseSchema(BlogCommentResponseDto)
  async create(@Body() data: CreateBlogCommentDto): Promise<BlogCommentResponseDto> {
    return await this.blogCommentService.create(data);
  }

  @Patch("/:id")
  
  @OpenAPI({ summary: "Update a blog comment" })
  @ResponseSchema(BlogCommentResponseDto)
  async update(
    @Param("id") id: number,
    @Body() data: UpdateBlogCommentDto
  ): Promise<BlogCommentResponseDto | { error: string }> {
    const updated = await this.blogCommentService.update(id, data);
    if (!updated) {
      return { error: "Not found" };
    }
    return updated;
  }

  @Delete("/:id")
  
  @OpenAPI({ summary: "Delete a blog comment" })
  async remove(@Param("id") id: number): Promise<{ message: string }> {
    await this.blogCommentService.remove(id);
    return { message: "Deleted successfully" };
  }
}
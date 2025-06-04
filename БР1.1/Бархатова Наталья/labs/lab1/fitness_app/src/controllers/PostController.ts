import {
  JsonController,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  OnUndefined,
  UseBefore 
} from "routing-controllers";
import { AppDataSource } from "../AppDataSource";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Post as PostEntity } from "../models/Post";

const postRepo = AppDataSource.getRepository(PostEntity);

@JsonController("/posts")
@UseBefore(AuthMiddleware)
export class PostController {
  @HttpPost()
  @HttpCode(201)
  async createPost(@Body() postData: Partial<PostEntity>) {
    const post = postRepo.create(postData);
    const savedPost = await postRepo.save(post);
    return savedPost;
  }

  @Get()
  async getAllPosts() {
    return await postRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  async getPostById(@Param("id") id: number) {
    const post = await postRepo.findOne({ where: { id: id.toString() }, relations: ["user"] });
    if (!post) {
      return { message: "Post not found" };
    }
    return post;
  }

  @Put("/:id")
  @OnUndefined(404)
  async updatePost(@Param("id") id: number, @Body() body: Partial<PostEntity>) {
    const post = await postRepo.findOne({ where: { id: id.toString() } });
    if (!post) {
      return { message: "Post not found" };
    }
    postRepo.merge(post, body);
    const updatedPost = await postRepo.save(post);
    return updatedPost;
  }

  @Delete("/:id")
  @OnUndefined(404)
  async deletePost(@Param("id") id: number) {
    const result = await postRepo.delete(id);
    if (result.affected === 0) {
      return { message: "Post not found" };
    }
    return { message: "Post deleted successfully" };
  }
}

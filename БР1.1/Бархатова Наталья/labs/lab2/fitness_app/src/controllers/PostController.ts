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
    return await postRepo.save(post);
  }

  @Get()
  @HttpCode(200)
  async getAllPosts() {
    return await postRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async getPostById(@Param("id") id: string) {
    return await postRepo.findOne({
      where: { id },
      relations: ["user"]
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  async updatePost(@Param("id") id: string, @Body() body: Partial<PostEntity>) {
    const post = await postRepo.findOne({ where: { id } });
    if (!post) return undefined;

    postRepo.merge(post, body);
    return await postRepo.save(post);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  async deletePost(@Param("id") id: string) {
    const result = await postRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

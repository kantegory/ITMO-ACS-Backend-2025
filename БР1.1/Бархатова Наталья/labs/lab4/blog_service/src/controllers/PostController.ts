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
import { OpenAPI } from "routing-controllers-openapi";
import { AppDataSource } from "../AppDataSource";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Post as PostEntity } from "../models/Post";

const postRepo = AppDataSource.getRepository(PostEntity);

@JsonController("/posts")
@UseBefore(AuthMiddleware)
export class PostController {
  @HttpPost()
  @HttpCode(201)
  @OpenAPI({
    summary: "Создать новый пост",
    description: "Создает новый пост и возвращает его",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: { type: "string", example: "My first post" },
              text: { type: "string", example: "This is the content of the post." },
              userId: { type: "string", example: "123e4567-e89b-12d3-a456-426614174000" }
            },
            required: ["title", "text", "userId"]
          }
        }
      }
    },
    responses: {
      201: { description: "Пост успешно создан" }
    }
  })
  async createPost(@Body() postData: Partial<PostEntity>) {
    const post = postRepo.create(postData);
    return await postRepo.save(post);
  }

  @Get()
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить все посты",
    description: "Возвращает список всех постов",
    responses: {
      200: { description: "Список постов" }
    }
  })
  async getAllPosts() {
    return await postRepo.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Получить пост по ID",
    description: "Возвращает пост с указанным ID, включая данные пользователя",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID поста",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: { description: "Пост найден" },
      404: { description: "Пост не найден" }
    }
  })
  async getPostById(@Param("id") id: string) {
    return await postRepo.findOne({
      where: { id }
    });
  }

  @Put("/:id")
  @OnUndefined(404)
  @HttpCode(200)
  @OpenAPI({
    summary: "Обновить пост",
    description: "Обновляет пост по ID и возвращает обновленные данные",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID поста для обновления",
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: { type: "string", example: "Updated title" },
              text: { type: "string", example: "Updated content" }
            }
          }
        }
      }
    },
    responses: {
      200: { description: "Пост успешно обновлен" },
      404: { description: "Пост не найден" }
    }
  })
  async updatePost(@Param("id") id: string, @Body() body: Partial<PostEntity>) {
    const post = await postRepo.findOne({ where: { id } });
    if (!post) return undefined;

    postRepo.merge(post, body);
    return await postRepo.save(post);
  }

  @Delete("/:id")
  @OnUndefined(404)
  @HttpCode(204)
  @OpenAPI({
    summary: "Удалить пост",
    description: "Удаляет пост по ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID поста для удаления",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      204: { description: "Пост успешно удален" },
      404: { description: "Пост не найден" }
    }
  })
  async deletePost(@Param("id") id: string) {
    const result = await postRepo.delete(id);
    if (result.affected === 0) return undefined;
    return;
  }
}

import { AppDataSource } from "../database/data-source";
import { PostComment } from "../entities/PostComment";

export const postCommentRepository = AppDataSource.getRepository(PostComment);
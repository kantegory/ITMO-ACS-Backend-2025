import { AppDataSource } from "../database/data-source";
import { PostLike } from "../entities/PostLike";

export const postLikeRepository = AppDataSource.getRepository(PostLike);
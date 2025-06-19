import { AppDataSource } from "../database/data-source";
import { PostTag } from "../entities/PostTag";

export const postTagRepository = AppDataSource.getRepository(PostTag);
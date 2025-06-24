import { AppDataSource } from "../database/data-source";
import { BlogPost } from "../entities/BlogPost";

export const blogPostRepository = AppDataSource.getRepository(BlogPost);

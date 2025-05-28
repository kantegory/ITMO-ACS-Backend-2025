import { AppDataSource } from "../data-source";
import { Review } from "../entities/Review";
import { BaseController } from "./BaseController";

export const reviewController = new BaseController(AppDataSource.getRepository(Review));

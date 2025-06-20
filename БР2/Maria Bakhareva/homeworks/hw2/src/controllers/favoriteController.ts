import { AppDataSource } from "../data-source";
import { Favorite } from "../entities/Favorite";
import { BaseController } from "./BaseController";

export const favoriteController = new BaseController(AppDataSource.getRepository(Favorite));

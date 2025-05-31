import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { BaseController } from "./BaseController";

export const userController = new BaseController(AppDataSource.getRepository(User));

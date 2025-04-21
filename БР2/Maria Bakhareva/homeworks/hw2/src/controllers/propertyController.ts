import { AppDataSource } from "../data-source";
import { Property } from "../entities/Property";
import { BaseController } from "./BaseController";

export const propertyController = new BaseController(AppDataSource.getRepository(Property));

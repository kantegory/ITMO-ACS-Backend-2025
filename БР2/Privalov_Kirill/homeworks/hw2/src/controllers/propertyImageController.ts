import { AppDataSource } from "../data-source";
import { PropertyImage } from "../entities/PropertyImage";
import { BaseController } from "./BaseController";

export const propertyImageController = new BaseController(AppDataSource.getRepository(PropertyImage));
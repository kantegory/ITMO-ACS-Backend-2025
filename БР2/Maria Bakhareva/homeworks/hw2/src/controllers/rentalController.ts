import { AppDataSource } from "../data-source";
import { Rental } from "../entities/Rental";
import { BaseController } from "./BaseController";

export const rentalController = new BaseController(AppDataSource.getRepository(Rental));

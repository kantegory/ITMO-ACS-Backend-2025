import { AppDataSource } from '../config/databaseConfig';
import { Rental } from '../entities/Rental';
import { BaseController } from './BaseController';

export const RentalController = new BaseController(
  AppDataSource.getRepository(Rental),
);

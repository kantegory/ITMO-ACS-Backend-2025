import { AppDataSource } from "../data-source";
import { Transaction } from "../entities/Transaction";
import { BaseController } from "./BaseController";

export const transactionController = new BaseController(AppDataSource.getRepository(Transaction));

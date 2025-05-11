import { AppDataSource } from "../data-source";
import { Message } from "../entities/Message";
import { BaseController } from "./BaseController";

export const messageController = new BaseController(AppDataSource.getRepository(Message));

//repository/index.ts
import { AppDataSource } from "../data-source";
import { Message } from "../entity/Message";
import { MessageService } from "../service/MessageService";


export const messageRepository = new MessageService(
  AppDataSource.getRepository(Message)
);

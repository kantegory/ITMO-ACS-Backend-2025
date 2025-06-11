import { Request, Response } from "express";
import { messageRepository } from "../repository";

export class MessageController {
  static async all(request: Request, response: Response) {
    const data = await messageRepository.findAll();
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async create(request: Request, response: Response) {
    const data = await messageRepository.createMessage(request.body);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async findOne(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await messageRepository.findOne(id);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async getChatHistory(request: Request, response: Response) {
    const first_id = Number(request.query.first_id);
    const second_id = Number(request.query.second_id);
    const data = await messageRepository.findChatHistory(first_id, second_id);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async update(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await messageRepository.updateMessage(id, request.body);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async delete(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await messageRepository.delete(id);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }
}
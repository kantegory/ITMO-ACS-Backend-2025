import { Request, Response } from "express";
import { userRepository } from "../repository";
export class UserController {
  static async all(request: Request, response: Response) {
    const data = await userRepository.findAll();
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async create(request: Request, response: Response) {
    const data = await userRepository.createUser(request.body);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async findOne(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await userRepository.findOne(id);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async findByEmail(request: Request, response: Response) {
    const email = request.params.email;
    const data = await userRepository.findByEmail(email);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }


  static async update(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await userRepository.updateUser(id, request.body);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async delete(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await userRepository.delete(id);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }
}
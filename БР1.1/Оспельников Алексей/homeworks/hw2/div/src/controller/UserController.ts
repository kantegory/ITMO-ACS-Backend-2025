import { Request, Response } from "express";
import { userRepository } from "../repository";

export class UserController {
  static async all(request: Request, response: Response) {
    const data = await userRepository.findAll();
    return response.status(200).send(data);
  }

  static async byEmail(request: Request, response: Response) {
    const data = await userRepository.findByEmail(request.params.email);
    return response.status(200).send(data);
  }

  static async create(request: Request, response: Response) {
    const data = await userRepository.createUser(request.body);
    return response.status(201).send(data);
  }

  static async findOne(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await userRepository.findOne(id);
    return response.send(data);
  }

  static async update(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await userRepository.updateUser(id, request.body);
    return response.send(data);
  }

  static async delete(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await userRepository.delete(id);
    return response.send(data);
  }
}
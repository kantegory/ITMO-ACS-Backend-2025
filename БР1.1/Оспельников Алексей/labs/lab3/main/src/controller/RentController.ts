import { Request, Response } from "express";
import { rentRepository } from "../repository";
export class RentController {
  static async all(request: Request, response: Response) {
    const data = await rentRepository.findAll();
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async create(request: Request, response: Response) {
    const data = await rentRepository.createRent(request.body);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async findOne(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await rentRepository.findOne(id);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async update(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await rentRepository.updateRent(id, request.body);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async delete(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await rentRepository.delete(id);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }
}
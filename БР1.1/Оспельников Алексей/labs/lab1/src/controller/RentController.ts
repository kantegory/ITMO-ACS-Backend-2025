import { Request, Response } from "express";
import { rentRepository } from "../repository";

export class RentController {
  static async all(request: Request, response: Response) {
    const data = await rentRepository.findAll();
    return response.status(200).send(data);
  }

  static async create(request: Request, response: Response) {
    const data = await rentRepository.createRent(request.body);
    return response.status(201).send(data);
  }

  static async findOne(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await rentRepository.findOne(id);
    return response.send(data);
  }

  static async update(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await rentRepository.updateRent(id, request.body);
    return response.send(data);
  }

  static async delete(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await rentRepository.delete(id);
    return response.send(data);
  }
}
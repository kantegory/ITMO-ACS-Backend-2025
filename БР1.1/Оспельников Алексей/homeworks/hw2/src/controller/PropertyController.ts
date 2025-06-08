import { Request, Response } from "express";
import { propertyRepository } from "../repository";

export class PropertyController {
  static async all(request: Request, response: Response) {
    const data = await propertyRepository.findAll();
    return response.status(200).send(data);
  }

  static async create(request: Request, response: Response) {
    const data = await propertyRepository.createProperty(request.body);
    return response.status(201).send(data);
  }

  static async findOne(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await propertyRepository.findOne(id);
    return response.send(data);
  }

  static async update(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await propertyRepository.updateProperty(id, request.body);
    return response.send(data);
  }

  static async delete(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await propertyRepository.delete(id);
    return response.send(data);
  }
}
import { Request, Response } from "express";
import { reviewRepository } from "../repository";
export class ReviewController {
  static async all(request: Request, response: Response) {
    const data = await reviewRepository.findAll();
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async create(request: Request, response: Response) {
    const data = await reviewRepository.createReview(request.body);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async findOne(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await reviewRepository.findOne(id);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async update(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await reviewRepository.updateReview(id, request.body);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }

  static async delete(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = await reviewRepository.delete(id);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
  }
}
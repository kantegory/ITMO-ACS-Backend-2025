import { Request, Response } from "express";
import { authRepository } from "../repository";
export class AuthController {

  async register(request: Request, response: Response) {
    const { email, username, password } = request.body;

    const data = await authRepository.register(email, username, password);
    return response.status(data['status']).json({
        data: data['data'],
        message: data['message'],
    });
     
  }

  async login(request: Request, response: Response) {
      const { email, username, password } = request.body;
      const data = await authRepository.login(email, username, password);
      return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }

  async verifyToken(request: Request, response: Response) {
      const { token } = request.body;
      const data = await authService.verify(token);
      return response.status(data['status']).json({
            data: data['data'],
            message: data['message'],
        });
    }
}
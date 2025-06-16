import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error.util';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const userIdHeader = req.headers['x-user-id'];

  if (!userIdHeader) {
    throw new CustomError('Unauthorized: User ID missing from Gateway', 401)
  }

  const userId = parseInt(userIdHeader as string, 10);

  if (isNaN(userId)) {
    throw new CustomError('Invalid User ID format from Gateway', 400)
  }

  req.userId = userId; // Сохраняем userId для использования в контроллерах

  next();
};
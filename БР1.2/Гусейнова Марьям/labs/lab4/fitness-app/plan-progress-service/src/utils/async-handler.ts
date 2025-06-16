import { Request, Response, NextFunction, RequestHandler } from 'express';

// Определяем наш собственный тип для асинхронного RequestHandler,
// который может возвращать Promise<any>, и он будет обернут.
type AsyncRequestHandler = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<any>;

// Функция-обертка для асинхронных контроллеров
// Она перехватывает ошибки и передает их в next(err)
export const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
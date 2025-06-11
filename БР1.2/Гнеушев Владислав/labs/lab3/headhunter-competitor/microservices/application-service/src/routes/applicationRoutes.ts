import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { ApplicationController } from '../controllers/ApplicationController';
import { HttpError } from '../errors/HttpErrors';
import { validationMiddleware, queryValidationMiddleware } from '../middlewares/validationMiddleware';
import { CreateApplicationDto, UpdateApplicationDto, GetApplicationsQueryDto } from './ApplicationDtos';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const applicationController = new ApplicationController();

router.post(
    '/',
    authMiddleware,
    validationMiddleware(CreateApplicationDto),
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;
            const result = await applicationController.createApplication(req.body as CreateApplicationDto, userId);
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    ...(error.details && { errors: error.details }),
                });
            } else {
                next(error);
            }
        }
    }
);

router.get(
    '/',
    queryValidationMiddleware(GetApplicationsQueryDto),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const queryParams = req.query as any;
            const result = await applicationController.getApplications(queryParams);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    ...(error.details && { errors: error.details }),
                });
            } else {
                next(error);
            }
        }
    }
);

const getApplicationByIdHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid application ID format'
            });
            return;
        }
        const result = await applicationController.getApplicationById(id);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
};

router.get('/:id', getApplicationByIdHandler);

const updateApplicationHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid application ID format'
            });
            return;
        }
        const updateData = req.body as UpdateApplicationDto;
        const result = await applicationController.updateApplication(id, updateData);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
};

router.put('/:id', validationMiddleware(UpdateApplicationDto, true), updateApplicationHandler);

const deleteApplicationHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid application ID format'
            });
            return;
        }
        const result = await applicationController.deleteApplication(id);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
};

router.delete('/:id', deleteApplicationHandler);

const markApplicationAsSeenHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid application ID format'
            });
            return;
        }
        const result = await applicationController.markApplicationAsSeen(id);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
};

router.patch('/:id/seen', markApplicationAsSeenHandler);

export default router; 
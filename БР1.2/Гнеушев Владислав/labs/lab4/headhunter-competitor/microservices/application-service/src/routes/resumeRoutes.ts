import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { ResumeController } from '../controllers/ResumeController';
import { HttpError } from '../errors/HttpErrors';
import { HttpValidationError, validationMiddleware, queryValidationMiddleware } from '../middlewares/validationMiddleware';
import { CreateResumeDto, UpdateResumeDto, GetResumesQueryDto } from './ResumeDtos';
import { authMiddleware } from '../middlewares/authMiddleware';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        iat: number;
        exp: number;
    };
}

const router = Router();
const resumeController = new ResumeController();

router.post(
    '/',
    authMiddleware,
    validationMiddleware(CreateResumeDto),
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;
            const result = await resumeController.createResume(req.body as CreateResumeDto, userId);
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
    queryValidationMiddleware(GetResumesQueryDto),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const queryParams = req.query as any;
            const result = await resumeController.getResumes(queryParams);
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

router.get('/me', authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const result = await resumeController.getResumesByUserId(userId);
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
});

const getResumeByIdHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
            return;
        }
        const result = await resumeController.getResumeById(id);
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

router.get('/:id', getResumeByIdHandler);

const updateResumeHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
            return;
        }
        const updateData = req.body as UpdateResumeDto;
        const result = await resumeController.updateResume(id, updateData);
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

router.put('/:id', validationMiddleware(UpdateResumeDto, true), updateResumeHandler);

const deleteResumeHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
            return;
        }
        const result = await resumeController.deleteResume(id);
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

router.delete('/:id', deleteResumeHandler);

export default router; 
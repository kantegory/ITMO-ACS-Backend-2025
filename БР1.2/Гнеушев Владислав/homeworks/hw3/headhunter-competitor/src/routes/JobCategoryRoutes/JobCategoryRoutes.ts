import express, { Request, Response, NextFunction } from 'express';
import { JobCategoryController } from '../../controllers/job-category.controller';
import { HttpError } from '../../errors/HttpErrors';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { CreateJobCategoryDto, UpdateJobCategoryDto } from './JobCategorySchemas';

const router = express.Router();
const jobCategoryController = new JobCategoryController();

/**
 * @openapi
 * /api/job-categories:
 *   get:
 *     tags:
 *       - Job Categories
 *     summary: Get all job categories
 *     responses:
 *       200:
 *         description: A list of job categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobCategoryOutput'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await jobCategoryController.getAll();
        res.status(200).json(categories);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
});

/**
 * @openapi
 * /api/job-categories/{id}:
 *   get:
 *     tags:
 *       - Job Categories
 *     summary: Get a job category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job category details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobCategoryOutput'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const category = await jobCategoryController.getById(id);
        res.status(200).json(category);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
});

/**
 * @openapi
 * /api/job-categories:
 *   post:
 *     tags:
 *       - Job Categories
 *     summary: Create a new job category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobCategoryDto'
 *     responses:
 *       201:
 *         description: Job category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobCategoryOutput'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
    '/',
    validationMiddleware(CreateJobCategoryDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const createDto = req.body as CreateJobCategoryDto;
        try {
            const newCategory = await jobCategoryController.create(createDto);
            res.status(201).json(newCategory);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({
                    message: error.message,
                    ...(error.details && { errors: error.details }),
                });
            } else {
                next(error);
            }
        }
    }
);

/**
 * @openapi
 * /api/job-categories/{id}:
 *   put:
 *     tags:
 *       - Job Categories
 *     summary: Update an existing job category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobCategoryDto'
 *     responses:
 *       200:
 *         description: Job category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobCategoryOutput'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put(
    '/:id',
    validationMiddleware(UpdateJobCategoryDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const updateDto = req.body as UpdateJobCategoryDto;
        try {
            const updatedCategory = await jobCategoryController.update(id, updateDto);
            res.status(200).json(updatedCategory);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({
                    message: error.message,
                    ...(error.details && { errors: error.details }),
                });
            } else {
                next(error);
            }
        }
    }
);

/**
 * @openapi
 * /api/job-categories/{id}:
 *   delete:
 *     tags:
 *       - Job Categories
 *     summary: Delete a job category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Job category deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        await jobCategoryController.delete(id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
});

export default router; 
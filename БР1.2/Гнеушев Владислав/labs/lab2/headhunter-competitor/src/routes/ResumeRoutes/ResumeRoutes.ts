import express, { Request, Response, NextFunction } from 'express';
import { ResumeController } from '../../controllers/resume.controller';
import { HttpError } from '../../errors/HttpErrors';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { CreateResumeDto, UpdateResumeDto } from './ResumeSchemas';

const router = express.Router();
const resumeController = new ResumeController();

/**
 * @openapi
 * /api/resumes:
 *   get:
 *     tags:
 *       - Resumes
 *     summary: Get all resumes
 *     responses:
 *       200:
 *         description: A list of resumes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResumeOutput'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resumes = await resumeController.getAll();
        res.status(200).json(resumes);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
        } else {
            next(error);
        }
    }
});

/**
 * @openapi
 * /api/resumes/employee/{employeeId}:
 *   get:
 *     tags:
 *       - Resumes
 *     summary: Get all resumes for a specific employee
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: A list of resumes for the specified employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResumeOutput'
 *       400:
 *         description: Invalid Employee ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No resumes found for this employee.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/employee/:employeeId', async (req: Request, res: Response, next: NextFunction) => {
    const { employeeId } = req.params;
    try {
        const resumes = await resumeController.getByEmployeeId(employeeId);
        res.status(200).json(resumes);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
        } else {
            next(error);
        }
    }
});

/**
 * @openapi
 * /api/resumes/{id}:
 *   get:
 *     tags:
 *       - Resumes
 *     summary: Get a specific resume by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the resume
 *     responses:
 *       200:
 *         description: The requested resume.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResumeOutput'
 *       400:
 *         description: Invalid resume ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Resume not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const resume = await resumeController.getById(id);
        res.status(200).json(resume);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
        } else {
            next(error);
        }
    }
});

/**
 * @openapi
 * /api/resumes:
 *   post:
 *     tags:
 *       - Resumes
 *     summary: Create a new resume
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResumeDto'
 *     responses:
 *       201:
 *         description: Resume created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResumeOutput'
 *       400:
 *         description: Invalid input (e.g., validation error, missing fields).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: EmployeeCabinet not found for the provided employeeId.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    '/',
    validationMiddleware(CreateResumeDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const createDto = req.body as CreateResumeDto;
        try {
            const newResume = await resumeController.create(createDto);
            res.status(201).json(newResume);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
            } else {
                next(error);
            }
        }
    }
);

/**
 * @openapi
 * /api/resumes/{id}:
 *   put:
 *     tags:
 *       - Resumes
 *     summary: Update an existing resume
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the resume to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateResumeDto'
 *     responses:
 *       200:
 *         description: Resume updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResumeOutput'
 *       400:
 *         description: Invalid input (e.g., validation error, invalid ID format).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Resume not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
    '/:id',
    validationMiddleware(UpdateResumeDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const updateDto = req.body as UpdateResumeDto;
        try {
            const updatedResume = await resumeController.update(id, updateDto);
            res.status(200).json(updatedResume);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
            } else {
                next(error);
            }
        }
    }
);

/**
 * @openapi
 * /api/resumes/{id}:
 *   delete:
 *     tags:
 *       - Resumes
 *     summary: Delete a resume
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the resume to delete
 *     responses:
 *       204:
 *         description: Resume deleted successfully.
 *       400:
 *         description: Invalid resume ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Resume not found for deletion.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        await resumeController.delete(id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
        } else {
            next(error);
        }
    }
});

export default router; 
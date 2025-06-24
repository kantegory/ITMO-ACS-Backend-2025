import express, { Request, Response, NextFunction } from 'express';
import { EmployerCabinetController } from '../../controllers/employer-cabinet.controller';
import { HttpError } from '../../errors/HttpErrors';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { CreateEmployerCabinetDto, UpdateEmployerCabinetDto } from './EmployerCabinetSchemas';

const router = express.Router();
const employerCabinetController = new EmployerCabinetController();

/**
 * @openapi
 * /api/employer-cabinets:
 *   get:
 *     tags:
 *       - Employer Cabinets
 *     summary: Get all employer cabinets
 *     responses:
 *       200:
 *         description: A list of employer cabinets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmployerCabinetOutput'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cabinets = await employerCabinetController.getAll();
        res.status(200).json(cabinets);
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
 * /api/employer-cabinets/user/{userId}:
 *   get:
 *     tags:
 *       - Employer Cabinets
 *     summary: Get employer cabinet by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string 
 *     responses:
 *       200:
 *         description: The employer cabinet for the given user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployerCabinetOutput'
 *       404:
 *         $ref: '#/components/responses/NotFound' 
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
        const cabinet = await employerCabinetController.getByUserId(userId);
        res.status(200).json(cabinet);
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
 * /api/employer-cabinets/{id}:
 *   get:
 *     tags:
 *       - Employer Cabinets
 *     summary: Get employer cabinet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employer cabinet details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployerCabinetOutput'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const cabinet = await employerCabinetController.getById(id);
        res.status(200).json(cabinet);
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
 * /api/employer-cabinets:
 *   post:
 *     tags:
 *       - Employer Cabinets
 *     summary: Create a new employer cabinet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployerCabinetDto'
 *     responses:
 *       201:
 *         description: Employer cabinet created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployerCabinetOutput'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
    '/',
    validationMiddleware(CreateEmployerCabinetDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const createDto = req.body as CreateEmployerCabinetDto;
        try {
            const newCabinet = await employerCabinetController.create(createDto);
            res.status(201).json(newCabinet);
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
 * /api/employer-cabinets/{id}:
 *   put:
 *     tags:
 *       - Employer Cabinets
 *     summary: Update an existing employer cabinet
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
 *             $ref: '#/components/schemas/UpdateEmployerCabinetDto'
 *     responses:
 *       200:
 *         description: Employer cabinet updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployerCabinetOutput'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put(
    '/:id',
    validationMiddleware(UpdateEmployerCabinetDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const updateDto = req.body as UpdateEmployerCabinetDto;
        try {
            const updatedCabinet = await employerCabinetController.update(id, updateDto);
            res.status(200).json(updatedCabinet);
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
 * /api/employer-cabinets/{id}:
 *   delete:
 *     tags:
 *       - Employer Cabinets
 *     summary: Delete an employer cabinet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Employer cabinet deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        await employerCabinetController.delete(id);
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
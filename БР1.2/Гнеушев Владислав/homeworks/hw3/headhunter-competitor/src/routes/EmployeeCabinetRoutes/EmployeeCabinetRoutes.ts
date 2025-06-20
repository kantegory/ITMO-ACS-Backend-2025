import express, { Request, Response, NextFunction } from 'express';
import { EmployeeCabinetController } from '../../controllers/employee-cabinet.controller';
import { HttpError } from '../../errors/HttpErrors';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { CreateEmployeeCabinetDto, UpdateEmployeeCabinetDto } from './EmployeeCabinetSchemas';

const router = express.Router();
const employeeCabinetController = new EmployeeCabinetController();

/**
 * @openapi
 * /api/employee-cabinets:
 *   get:
 *     tags:
 *       - Employee Cabinets
 *     summary: Get all employee cabinets
 *     responses:
 *       200:
 *         description: A list of employee cabinets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmployeeCabinetOutput'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cabinets = await employeeCabinetController.getAll();
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
 * /api/employee-cabinets/user/{userId}:
 *   get:
 *     tags:
 *       - Employee Cabinets
 *     summary: Get employee cabinet by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string 
 *     responses:
 *       200:
 *         description: The employee cabinet for the given user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeCabinetOutput'
 *       404:
 *         $ref: '#/components/responses/NotFound' 
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
        const cabinet = await employeeCabinetController.getByUserId(userId);
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
 * /api/employee-cabinets/{id}:
 *   get:
 *     tags:
 *       - Employee Cabinets
 *     summary: Get employee cabinet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee cabinet details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeCabinetOutput'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const cabinet = await employeeCabinetController.getById(id);
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
 * /api/employee-cabinets:
 *   post:
 *     tags:
 *       - Employee Cabinets
 *     summary: Create a new employee cabinet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployeeCabinetDto'
 *     responses:
 *       201:
 *         description: Employee cabinet created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeCabinetOutput'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
    '/',
    validationMiddleware(CreateEmployeeCabinetDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const createDto = req.body as CreateEmployeeCabinetDto;
        try {
            const newCabinet = await employeeCabinetController.create(createDto);
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
 * /api/employee-cabinets/{id}:
 *   put:
 *     tags:
 *       - Employee Cabinets
 *     summary: Update an existing employee cabinet
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
 *             $ref: '#/components/schemas/UpdateEmployeeCabinetDto'
 *     responses:
 *       200:
 *         description: Employee cabinet updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeCabinetOutput'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put(
    '/:id',
    validationMiddleware(UpdateEmployeeCabinetDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const updateDto = req.body as UpdateEmployeeCabinetDto;
        try {
            const updatedCabinet = await employeeCabinetController.update(id, updateDto);
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
 * /api/employee-cabinets/{id}:
 *   delete:
 *     tags:
 *       - Employee Cabinets
 *     summary: Delete an employee cabinet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Employee cabinet deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        await employeeCabinetController.delete(id);
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
import express, { Request, Response, NextFunction } from 'express';
import { CompanyController } from '../../controllers/company.controller';
import { HttpError } from '../../errors/HttpErrors';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { CreateCompanyDto, UpdateCompanyDto } from './CompanySchemas';

const router = express.Router();
const companyController = new CompanyController();

/**
 * @openapi
 * /api/companies:
 *   get:
 *     tags:
 *       - Companies
 *     summary: Get all companies
 *     responses:
 *       200:
 *         description: A list of companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompanyOutput'
 *       500:
 *         $ref: '#/components/responses/InternalServerError' 
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companies = await companyController.getAll();
        res.status(200).json(companies);
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
 * /api/companies/employer/{employerId}:
 *   get:
 *     tags:
 *       - Companies
 *     summary: Get companies by employer ID
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of companies for the given employer.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompanyOutput'
 *       404:
 *         $ref: '#/components/responses/NotFound' 
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/employer/:employerId', async (req: Request, res: Response, next: NextFunction) => {
    const { employerId } = req.params;
    try {
        const companies = await companyController.getByEmployerId(employerId);
        res.status(200).json(companies);
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
 * /api/companies/{id}:
 *   get:
 *     tags:
 *       - Companies
 *     summary: Get a company by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyOutput'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const company = await companyController.getById(id);
        res.status(200).json(company);
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
 * /api/companies:
 *   post:
 *     tags:
 *       - Companies
 *     summary: Create a new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCompanyDto'
 *     responses:
 *       201:
 *         description: Company created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyOutput'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
    '/',
    validationMiddleware(CreateCompanyDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const createCompanyDto = req.body as CreateCompanyDto;
        try {
            const newCompany = await companyController.create(createCompanyDto);
            res.status(201).json(newCompany);
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
 * /api/companies/{id}:
 *   put:
 *     tags:
 *       - Companies
 *     summary: Update an existing company
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
 *             $ref: '#/components/schemas/UpdateCompanyDto'
 *     responses:
 *       200:
 *         description: Company updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyOutput'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put(
    '/:id',
    validationMiddleware(UpdateCompanyDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const updateCompanyDto = req.body as UpdateCompanyDto;
        try {
            const updatedCompany = await companyController.update(id, updateCompanyDto);
            res.status(200).json(updatedCompany);
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
 * /api/companies/{id}:
 *   delete:
 *     tags:
 *       - Companies
 *     summary: Delete a company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Company deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        await companyController.delete(id);
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
import express, { Request, Response, NextFunction } from 'express';
import { JobOfferController } from '../../controllers/job-offer.controller';
import { HttpError } from '../../errors/HttpErrors';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { CreateJobOfferDto, UpdateJobOfferDto } from './JobOfferSchemas';

const router = express.Router();
const jobOfferController = new JobOfferController();

/**
 * @openapi
 * /api/job-offers:
 *   get:
 *     tags:
 *       - Job Offers
 *     summary: Get all job offers
 *     responses:
 *       200:
 *         description: A list of job offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobOfferOutput'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobOffers = await jobOfferController.getAll();
        res.status(200).json(jobOffers);
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
 * /api/job-offers/company/{companyId}:
 *   get:
 *     tags:
 *       - Job Offers
 *     summary: Get job offers by company ID
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the company
 *     responses:
 *       200:
 *         description: A list of job offers for the given company.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobOfferOutput'
 *       400:
 *         description: Invalid Company ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No job offers found for this company or company not found.
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
router.get('/company/:companyId', async (req: Request, res: Response, next: NextFunction) => {
    const { companyId } = req.params;
    try {
        const jobOffers = await jobOfferController.getByCompanyId(companyId);
        res.status(200).json(jobOffers);
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
 * /api/job-offers/category/{categoryId}:
 *   get:
 *     tags:
 *       - Job Offers
 *     summary: Get job offers by category ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job category
 *     responses:
 *       200:
 *         description: A list of job offers for the given category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobOfferOutput'
 *       400:
 *         description: Invalid Job Category ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No job offers found for this category or category not found.
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
router.get('/category/:categoryId', async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;
    try {
        const jobOffers = await jobOfferController.getByCategoryId(categoryId);
        res.status(200).json(jobOffers);
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
 * /api/job-offers/{id}:
 *   get:
 *     tags:
 *       - Job Offers
 *     summary: Get a job offer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job offer
 *     responses:
 *       200:
 *         description: Job offer details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOfferOutput'
 *       400:
 *         description: Invalid job offer ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Job offer not found.
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
        const jobOffer = await jobOfferController.getById(id);
        res.status(200).json(jobOffer);
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
 * /api/job-offers:
 *   post:
 *     tags:
 *       - Job Offers
 *     summary: Create a new job offer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobOfferDto'
 *     responses:
 *       201:
 *         description: Job offer created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOfferOutput'
 *       400:
 *         description: Invalid input (e.g., validation error, missing fields, invalid IDs).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Referenced entity (e.g., Company, Category, Skill) not found.
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
    validationMiddleware(CreateJobOfferDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const createDto = req.body as CreateJobOfferDto;
        try {
            const newJobOffer = await jobOfferController.create(createDto);
            res.status(201).json(newJobOffer);
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
 * /api/job-offers/{id}:
 *   put:
 *     tags:
 *       - Job Offers
 *     summary: Update an existing job offer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job offer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobOfferDto'
 *     responses:
 *       200:
 *         description: Job offer updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobOfferOutput'
 *       400:
 *         description: Invalid input (e.g., validation error, invalid ID format).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Job offer not found or referenced entity (e.g., Skill) not found.
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
    validationMiddleware(UpdateJobOfferDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const updateDto = req.body as UpdateJobOfferDto;
        try {
            const updatedJobOffer = await jobOfferController.update(id, updateDto);
            res.status(200).json(updatedJobOffer);
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
 * /api/job-offers/{id}:
 *   delete:
 *     tags:
 *       - Job Offers
 *     summary: Delete a job offer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job offer to delete
 *     responses:
 *       204:
 *         description: Job offer deleted successfully.
 *       400:
 *         description: Invalid job offer ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Job offer not found for deletion.
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
        await jobOfferController.delete(id);
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
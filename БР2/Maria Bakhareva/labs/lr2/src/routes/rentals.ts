import { Router } from 'express';
import { RentalController } from '../controllers/RentalController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Rental management endpoints
 */

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: Get all rentals
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: A list of rentals
 */
router.get('/', RentalController.getAll);

/**
 * @swagger
 * /api/rentals/{id}:
 *   get:
 *     summary: Get a rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Rental ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rental found
 *       404:
 *         description: Rental not found
 */
router.get('/:id', RentalController.getById);

/**
 * @swagger
 * /api/rentals:
 *   post:
 *     summary: Create a new rental
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - tenantId
 *               - startDate
 *               - endDate
 *             properties:
 *               propertyId:
 *                 type: string
 *               tenantId:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Rental created
 *       400:
 *         description: Validation error
 */
router.post('/', RentalController.create);

/**
 * @swagger
 * /api/rentals/{id}:
 *   put:
 *     summary: Update a rental
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Rental ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *               tenantId:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Rental updated
 *       404:
 *         description: Rental not found
 */
router.put('/:id', RentalController.update);

/**
 * @swagger
 * /api/rentals/{id}:
 *   delete:
 *     summary: Delete a rental
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Rental ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Rental deleted
 *       404:
 *         description: Rental not found
 */
router.delete('/:id', RentalController.delete);

export default router;

import { Router } from 'express';
import { PropertyImageController } from '../controllers/PropertyImageController';
import { checkJwt } from '../middleware/checkJwt';

const router = Router();
const propertyImageController = new PropertyImageController();

/**
 * @swagger
 * tags:
 *   name: Property Images
 *   description: Property image management endpoints
 */

/**
 * @swagger
 * /api/property-images/upload:
 *   post:
 *     summary: Upload images for a property
 *     tags: [Property Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Images uploaded successfully
 *       400:
 *         description: Bad request or validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/upload', checkJwt, propertyImageController.uploadImages);

/**
 * @swagger
 * /api/property-images/{propertyId}:
 *   get:
 *     summary: Get all images for a property
 *     tags: [Property Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         description: Property ID to get images
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of images for the property
 *       404:
 *         description: Property not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:propertyId', checkJwt, propertyImageController.getById);

export default router;

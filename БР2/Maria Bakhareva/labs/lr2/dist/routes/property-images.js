"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PropertyImageController_1 = require("../controllers/PropertyImageController");
const checkJwt_1 = require("../middleware/checkJwt");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: PropertyImages
 *   description: Property image management endpoints
 */
/**
 * @swagger
 * /api/property-images/upload:
 *   post:
 *     summary: Upload images for a property
 *     tags: [PropertyImages]
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
router.post('/upload', checkJwt_1.checkJwt, PropertyImageController_1.PropertyImageController.uploadImages);
/**
 * @swagger
 * /api/property-images/{propertyId}:
 *   get:
 *     summary: Get all images for a property
 *     tags: [PropertyImages]
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
router.get('/:propertyId', checkJwt_1.checkJwt, PropertyImageController_1.PropertyImageController.getAll);
exports.default = router;

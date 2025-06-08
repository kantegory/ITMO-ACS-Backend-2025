"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PropertyController_1 = require("../controllers/PropertyController");
const checkJwt_1 = require("../middleware/checkJwt");
const User_1 = require("../entities/User");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management endpoints
 */
/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of properties
 */
router.get('/', checkJwt_1.checkJwt, PropertyController_1.PropertyController.getAll);
/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Get a property by ID
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property found
 *       404:
 *         description: Property not found
 */
router.get('/:id', checkJwt_1.checkJwt, PropertyController_1.PropertyController.getById);
/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - address
 *               - price
 *               - type
 *               - ownerId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               type:
 *                 type: string
 *               ownerId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Property created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post('/', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.LANDLORD), PropertyController_1.PropertyController.create);
/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Update a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Property updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Property not found
 */
router.put('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.LANDLORD), PropertyController_1.PropertyController.update);
/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Property deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Property not found
 */
router.delete('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.LANDLORD), PropertyController_1.PropertyController.delete);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PropertyController_1 = require("../controller/PropertyController");
const propertyRouter = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the property.
 *         type:
 *           type: string
 *           description: The type of the property (e.g., Apartment, House).
 *         rating:
 *           type: number
 *           format: decimal
 *           description: The rating of the property.
 *         rent_type:
 *           type: string
 *           description: The type of rental (e.g., Daily, Monthly).
 *         rent_cost:
 *           type: number
 *           format: decimal
 *           description: The cost of rent.
 *         rent_duration:
 *           type: string
 *           format: date
 *           description: The date for rent duration.
 *         max_guests:
 *           type: integer
 *           description: The maximum number of guests allowed.
 *         comforts:
 *           type: string
 *           description: A comma-separated list of comforts (e.g., WiFi, TV).
 *         description:
 *           type: string
 *           description: A detailed description of the property.
 *         is_rentable:
 *           type: boolean
 *           description: Indicates if the property is currently rentable.
 *         address:
 *           type: string
 *           description: The address of the property.
 *         deposit:
 *           type: number
 *           format: decimal
 *           description: The deposit amount.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the property was created.
 */
/**
 * @swagger
 * tags:
 *   name: Property
 *   description: Operations related to properties
 */
/**
 * @swagger
 * /api/property:
 *   get:
 *     summary: Retrieve a list of all properties
 *     description: Retrieve a list of all properties from the database.
 *     tags: [Property]
 *     responses:
 *       200:
 *         description: A list of properties.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 *       500:
 *         description: Internal server error.
 */
propertyRouter.get("/property", PropertyController_1.PropertyController.all);
/**
 * @swagger
 * /api/property:
 *   post:
 *     summary: Create a new property
 *     description: Create a new property in the database.
 *     tags: [Property]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         description: Property created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
propertyRouter.post("/property", PropertyController_1.PropertyController.create);
/**
 * @swagger
 * /api/property/{id}:
 *   get:
 *     summary: Retrieve a specific property by ID
 *     description: Retrieve a specific property from the database.
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the property to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested property.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Property not found.
 *       500:
 *         description: Internal server error.
 */
propertyRouter.get("/property/:id", PropertyController_1.PropertyController.findOne);
/**
 * @swagger
 * /api/property/{id}:
 *   put:
 *     summary: Update an existing property by ID
 *     description: Update an existing property in the database.
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the property to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Property updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Property not found.
 *       500:
 *         description: Internal server error.
 */
propertyRouter.put("/property/:id", PropertyController_1.PropertyController.update);
/**
 * @swagger
 * /api/property/{id}:
 *   delete:
 *     summary: Delete a property by ID
 *     description: Delete a property from the database.
 *     tags: [Property]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the property to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Property deleted successfully (no content).
 *       404:
 *         description: Property not found.
 *       500:
 *         description: Internal server error.
 */
propertyRouter.delete("/property/:id", PropertyController_1.PropertyController.delete);
exports.default = propertyRouter;
//# sourceMappingURL=PropertyRouter.js.map
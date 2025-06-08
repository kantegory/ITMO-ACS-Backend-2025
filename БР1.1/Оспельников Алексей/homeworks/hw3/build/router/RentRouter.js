"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RentController_1 = require("../controller/RentController");
const rentRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Rent
 *   description: Operations related to rents
 */
/**
 * /**
 * @swagger
 * components:
 *   schemas:
 *     Rent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the rent.
 *         guest_count:
 *           type: integer
 *           description: The number of guests included in the rent.
 *         status:
 *           type: string
 *           description: The status of the rent (e.g., 'active', 'pending', 'completed').
 *         start_rent:
 *           type: string
 *           format: date
 *           description: The date when the rent starts.
 *         end_rent:
 *           type: string
 *           format: date
 *           description: The date when the rent ends.
 *         tenant:
 *           type: integer
 *           description: The ID of the tenant (User).
 *         estate:
 *           type: integer
 *           description: The ID of the property (Estate) being rented.
 *         review:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 *           description: Reviews associated with this rent.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the rent was created.
 *
 *     RentCreate:
 *       type: object
 *       properties:
 *         guest_count:
 *           type: integer
 *           description: The number of guests included in the rent.
 *         status:
 *           type: string
 *           description: The status of the rent (e.g., 'active', 'pending', 'completed').
 *         start_rent:
 *           type: string
 *           format: date
 *           description: The date when the rent starts.
 *         end_rent:
 *           type: string
 *           format: date
 *           description: The date when the rent ends.
 *         tenant:
 *           type: integer
 *           description: The ID of the tenant (User).
 *         estate:
 *           type: integer
 *           description: The ID of the property (Estate) being rented.
 */
/**
 * @swagger
 * /api/rents:
 *   get:
 *     summary: Retrieve a list of all rents
 *     description: Retrieve a list of all rents from the database.
 *     tags: [Rent]
 *     responses:
 *       200:
 *         description: A list of rents.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rent'
 *       500:
 *         description: Internal server error.
 */
rentRouter.get("/rents", RentController_1.RentController.all);
/**
 * @swagger
 * /api/rents:
 *   post:
 *     summary: Create a new rent
 *     description: Create a new rent in the database.
 *     tags: [Rent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentCreate'
 *     responses:
 *       201:
 *         description: Rent created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentCreate'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
rentRouter.post("/rents", RentController_1.RentController.create);
/**
 * @swagger
 * /api/rents/{id}:
 *   get:
 *     summary: Retrieve a specific rent by ID
 *     description: Retrieve a specific rent from the database.
 *     tags: [Rent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the rent to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested rent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 *       404:
 *         description: Rent not found.
 *       500:
 *         description: Internal server error.
 */
rentRouter.get("/rents/:id", RentController_1.RentController.findOne);
/**
 * @swagger
 * /api/rents/{id}:
 *   put:
 *     summary: Update an existing rent by ID
 *     description: Update an existing rent in the database.
 *     tags: [Rent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the rent to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       200:
 *         description: Rent updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Rent not found.
 *       500:
 *         description: Internal server error.
 */
rentRouter.put("/rents/:id", RentController_1.RentController.update);
/**
 * @swagger
 * /api/rents/{id}:
 *   delete:
 *     summary: Delete a rent by ID
 *     description: Delete a rent from the database.
 *     tags: [Rent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the rent to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Rent deleted successfully (no content).
 *       404:
 *         description: Rent not found.
 *       500:
 *         description: Internal server error.
 */
rentRouter.delete("/rents/:id", RentController_1.RentController.delete);
exports.default = rentRouter;
//# sourceMappingURL=RentRouter.js.map
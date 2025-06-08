"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const userRouter = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the user.
 *         fullname:
 *           type: string
 *           description: The full name of the user.
 *         phone:
 *           type: string
 *           description: The phone number of the user.
 *         city:
 *           type: string
 *           description: The city where the user is located.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user (should be hashed in a real application).
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was created.
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to users
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of all users
 *     description: Retrieve a list of all users from the database.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/users", UserController_1.UserController.all);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/users", UserController_1.UserController.create);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a specific user by ID
 *     description: Retrieve a specific user from the database.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/users/:id", UserController_1.UserController.findOne);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user by ID
 *     description: Update an existing user in the database.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.put("/users/:id", UserController_1.UserController.update);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user from the database.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully (no content).
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.delete("/users/:id", UserController_1.UserController.delete);
exports.default = userRouter;
//# sourceMappingURL=UserRouter.js.map
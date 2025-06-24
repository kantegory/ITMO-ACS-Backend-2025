/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {authenticateJWT} from "../middlewares/auth.middleware";

const router = Router();
const controller = new UserController();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     security: [bearerAuth: []]
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", authenticateJWT, controller.create.bind(controller));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", authenticateJWT, controller.getAll.bind(controller));

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     security: [bearerAuth: []]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 */
router.get("/email/:email", authenticateJWT, controller.getByEmail.bind(controller));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security: [bearerAuth: []]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 */
router.get("/:id", authenticateJWT, controller.getById.bind(controller));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security: [bearerAuth: []]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/:id", authenticateJWT, controller.update.bind(controller));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security: [bearerAuth: []]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete("/:id", authenticateJWT, controller.delete.bind(controller));

export default router;

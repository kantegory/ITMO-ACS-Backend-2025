/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job applications
 */
import { Router } from "express";
import { ApplicationController } from "../controllers/ApplicationController";

const router = Router();
const controller = new ApplicationController();

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a job application
 *     tags: [Applications]
 *     responses:
 *       201:
 *         description: Application created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of applications
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /applications/{id}:
 *   get:
 *     summary: Get application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application found
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /applications/{id}:
 *   put:
 *     summary: Update an application
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application updated
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: Delete an application
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Application deleted
 */
router.delete("/:id", controller.delete);

export default router;

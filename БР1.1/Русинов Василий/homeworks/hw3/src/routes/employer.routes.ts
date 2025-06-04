/**
 * @swagger
 * tags:
 *   name: Employers
 *   description: Employer management
 */
import { Router } from "express";
import { EmployerController } from "../controllers/EmployerController";

const router = Router();
const controller = new EmployerController();

/**
 * @swagger
 * /employers:
 *   post:
 *     summary: Create an employer
 *     tags: [Employers]
 *     responses:
 *       201:
 *         description: Employer created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /employers:
 *   get:
 *     summary: Get all employers
 *     tags: [Employers]
 *     responses:
 *       200:
 *         description: List of employers
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /employers/{id}:
 *   get:
 *     summary: Get employer by ID
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employer found
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /employers/{id}:
 *   put:
 *     summary: Update an employer
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employer updated
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /employers/{id}:
 *   delete:
 *     summary: Delete an employer
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Employer deleted
 */
router.delete("/:id", controller.delete);

export default router;

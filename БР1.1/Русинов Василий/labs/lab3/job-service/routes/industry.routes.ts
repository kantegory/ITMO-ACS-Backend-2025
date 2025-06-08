/**
 * @swagger
 * tags:
 *   name: Industries
 *   description: Industry management
 */
import { Router } from "express";
import { IndustryController } from "../controllers/IndustryController";

const router = Router();
const controller = new IndustryController();

/**
 * @swagger
 * /industries:
 *   post:
 *     summary: Create an industry
 *     tags: [Industries]
 *     responses:
 *       201:
 *         description: Industry created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /industries:
 *   get:
 *     summary: Get all industries
 *     tags: [Industries]
 *     responses:
 *       200:
 *         description: List of industries
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /industries/{id}:
 *   get:
 *     summary: Get industry by ID
 *     tags: [Industries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Industry found
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /industries/{id}:
 *   put:
 *     summary: Update an industry
 *     tags: [Industries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Industry updated
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /industries/{id}:
 *   delete:
 *     summary: Delete an industry
 *     tags: [Industries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Industry deleted
 */
router.delete("/:id", controller.delete);

export default router;

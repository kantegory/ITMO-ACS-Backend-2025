/**
 * @swagger
 * tags:
 *   name: Resumes
 *   description: Resume management
 */
import { Router } from "express";
import { ResumeController } from "../controllers/ResumeController";

const router = Router();
const controller = new ResumeController();

/**
 * @swagger
 * /resumes:
 *   post:
 *     summary: Create a resume
 *     tags: [Resumes]
 *     responses:
 *       201:
 *         description: Resume created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /resumes:
 *   get:
 *     summary: Get all resumes
 *     tags: [Resumes]
 *     responses:
 *       200:
 *         description: List of resumes
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /resumes/{id}:
 *   get:
 *     summary: Get resume by ID
 *     tags: [Resumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume found
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /resumes/{id}:
 *   put:
 *     summary: Update a resume
 *     tags: [Resumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume updated
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /resumes/{id}:
 *   delete:
 *     summary: Delete a resume
 *     tags: [Resumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Resume deleted
 */
router.delete("/:id", controller.delete);

export default router;

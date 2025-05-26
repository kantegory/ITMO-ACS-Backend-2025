import { Request, Response } from "express";
import { userMeasurementsProgressRepository } from "../repositories/userMeasurementsProgress.repository";
import { UserMeasurementsProgress } from "../entities/UserMeasurementsProgress";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserMeasurementsProgress:
 *       type: object
 *       required:
 *         - weight
 *         - height
 *         - user_id
 *       properties:
 *         measurements_id:
 *           type: integer
 *           description: The auto-generated ID of the measurement
 *         user_id:
 *           type: integer
 *           description: The ID of the user
 *         weight:
 *           type: number
 *           description: The weight of the user in kilograms
 *         height:
 *           type: number
 *           description: The height of the user in centimeters
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the measurement
 *         notes:
 *           type: string
 *           description: Optional notes for the measurement
 */
export const UserMeasurementsProgressController = {
  /**
   * @swagger
   * /measurements:
   *   post:
   *     summary: Create a new user measurement
   *     tags: [UserMeasurementsProgress]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserMeasurementsProgress'
   *     responses:
   *       200:
   *         description: The created measurement
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserMeasurementsProgress'
   */
  create: async (req: Request, res: Response) => {
    const progress = await userMeasurementsProgressRepository.save(req.body);
    res.json(progress);
  },

  /**
   * @swagger
   * /measurements:
   *   get:
   *     summary: Get all user measurements
   *     tags: [UserMeasurementsProgress]
   *     responses:
   *       200:
   *         description: List of all measurements
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/UserMeasurementsProgress'
   */
  getAll: async (_: Request, res: Response) => {
    const progresses = await userMeasurementsProgressRepository.find();
    res.json(progresses);
  },

  /**
   * @swagger
   * /measurements/{id}:
   *   get:
   *     summary: Get a measurement by ID
   *     tags: [UserMeasurementsProgress]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The measurement ID
   *     responses:
   *       200:
   *         description: The measurement
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserMeasurementsProgress'
   *       404:
   *         description: Progress not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  getById: async (req: Request, res: Response) => {
    const progress = await userMeasurementsProgressRepository.findOneBy({ measurements_id: +req.params.id });
    if (!progress) return res.status(404).json({ message: "Progress not found" });
    res.json(progress);
  },

  /**
   * @swagger
   * /measurements/{id}:
   *   put:
   *     summary: Update a measurement by ID
   *     tags: [UserMeasurementsProgress]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The measurement ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserMeasurementsProgress'
   *     responses:
   *       200:
   *         description: Measurement updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  update: async (req: Request, res: Response) => {
    await userMeasurementsProgressRepository.update(req.params.id, req.body);
    res.json({ message: "Progress updated" });
  },

  /**
   * @swagger
   * /measurements/{id}:
   *   delete:
   *     summary: Delete a measurement by ID
   *     tags: [UserMeasurementsProgress]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The measurement ID
   *     responses:
   *       200:
   *         description: Measurement deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  delete: async (req: Request, res: Response) => {
    await userMeasurementsProgressRepository.delete(req.params.id);
    res.json({ message: "Progress deleted" });
  },
};
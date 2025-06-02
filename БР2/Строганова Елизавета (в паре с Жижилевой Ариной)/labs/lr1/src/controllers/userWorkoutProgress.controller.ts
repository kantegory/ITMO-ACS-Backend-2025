import { Request, Response } from "express";
import { userWorkoutProgressRepository } from "../repositories/userWorkoutProgress.repository";
import { UserWorkoutProgress } from "../entities/UserWorkoutProgress";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserWorkoutProgress:
 *       type: object
 *       required:
 *         - user_id
 *         - workout_id
 *         - status
 *       properties:
 *         progress_id:
 *           type: integer
 *           description: The auto-generated ID of the workout progress
 *         user_id:
 *           type: integer
 *           description: The ID of the user
 *         workout_id:
 *           type: integer
 *           description: The ID of the workout
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the progress
 *         status:
 *           type: string
 *           description: The status of the workout (e.g., completed, in-progress)
 *         notes:
 *           type: string
 *           description: Optional notes for the progress
 */
export const UserWorkoutProgressController = {
  /**
   * @swagger
   * /workout-progress:
   *   post:
   *     summary: Create a new workout progress
   *     tags: [UserWorkoutProgress]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserWorkoutProgress'
   *     responses:
   *       200:
   *         description: The created workout progress
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserWorkoutProgress'
   */
  create: async (req: Request, res: Response) => {
    const progress = await userWorkoutProgressRepository.save(req.body);
    res.json(progress);
  },

  /**
   * @swagger
   * /workout-progress:
   *   get:
   *     summary: Get all workout progresses
   *     tags: [UserWorkoutProgress]
   *     responses:
   *       200:
   *         description: List of all workout progresses
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/UserWorkoutProgress'
   */
  getAll: async (_: Request, res: Response) => {
    const progresses = await userWorkoutProgressRepository.find();
    res.json(progresses);
  },

  /**
   * @swagger
   * /workout-progress/{id}:
   *   get:
   *     summary: Get a workout progress by ID
   *     tags: [UserWorkoutProgress]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The workout progress ID
   *     responses:
   *       200:
   *         description: The workout progress
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserWorkoutProgress'
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
    const progress = await userWorkoutProgressRepository.findOneBy({ progress_id: +req.params.id });
    if (!progress) return res.status(404).json({ message: "Progress not found" });
    res.json(progress);
  },

  /**
   * @swagger
   * /workout-progress/{id}:
   *   put:
   *     summary: Update a workout progress by ID
   *     tags: [UserWorkoutProgress]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The workout progress ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserWorkoutProgress'
   *     responses:
   *       200:
   *         description: Workout progress updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  update: async (req: Request, res: Response) => {
    await userWorkoutProgressRepository.update(req.params.id, req.body);
    res.json({ message: "Progress updated" });
  },

  /**
   * @swagger
   * /workout-progress/{id}:
   *   delete:
   *     summary: Delete a workout progress by ID
   *     tags: [UserWorkoutProgress]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The workout progress ID
   *     responses:
   *       200:
   *         description: Workout progress deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  delete: async (req: Request, res: Response) => {
    await userWorkoutProgressRepository.delete(req.params.id);
    res.json({ message: "Progress deleted" });
  },
};
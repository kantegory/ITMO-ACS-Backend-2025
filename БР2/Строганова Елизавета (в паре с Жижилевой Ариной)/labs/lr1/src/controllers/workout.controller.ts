import { Request, Response } from "express";
import { workoutRepository } from "../repositories/workout.repository";
import { Workout } from "../entities/Workout";

/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - video_url
 *         - duration_minutes
 *         - difficulty_level
 *         - type
 *         - plan_id
 *       properties:
 *         workout_id:
 *           type: integer
 *           description: The auto-generated ID of the workout
 *         plan_id:
 *           type: integer
 *           description: The ID of the workout plan
 *         title:
 *           type: string
 *           description: The title of the workout
 *         description:
 *           type: string
 *           description: The description of the workout
 *         video_url:
 *           type: string
 *           description: The URL of the workout video
 *         duration_minutes:
 *           type: integer
 *           description: The duration of the workout in minutes
 *         difficulty_level:
 *           type: string
 *           description: The difficulty level of the workout
 *         type:
 *           type: string
 *           description: The type of the workout
 */
export const WorkoutController = {
  /**
   * @swagger
   * /workouts:
   *   post:
   *     summary: Create a new workout
   *     tags: [Workouts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Workout'
   *     responses:
   *       200:
   *         description: The created workout
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Workout'
   */
  create: async (req: Request, res: Response) => {
    const workout = await workoutRepository.save(req.body);
    res.json(workout);
  },

  /**
   * @swagger
   * /workouts:
   *   get:
   *     summary: Get all workouts
   *     tags: [Workouts]
   *     responses:
   *       200:
   *         description: List of all workouts
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Workout'
   */
  getAll: async (_: Request, res: Response) => {
    const workouts = await workoutRepository.find();
    res.json(workouts);
  },

  /**
   * @swagger
   * /workouts/{id}:
   *   get:
   *     summary: Get a workout by ID
   *     tags: [Workouts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The workout ID
   *     responses:
   *       200:
   *         description: The workout
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Workout'
   *       404:
   *         description: Workout not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  getById: async (req: Request, res: Response) => {
    const workout = await workoutRepository.findOneBy({ workout_id: +req.params.id });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  },

  /**
   * @swagger
   * /workouts/{id}:
   *   put:
   *     summary: Update a workout by ID
   *     tags: [Workouts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The workout ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Workout'
   *     responses:
   *       200:
   *         description: Workout updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  update: async (req: Request, res: Response) => {
    await workoutRepository.update(req.params.id, req.body);
    res.json({ message: "Workout updated" });
  },

  /**
   * @swagger
   * /workouts/{id}:
   *   delete:
   *     summary: Delete a workout by ID
   *     tags: [Workouts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The workout ID
   *     responses:
   *       200:
   *         description: Workout deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  delete: async (req: Request, res: Response) => {
    await workoutRepository.delete(req.params.id);
    res.json({ message: "Workout deleted" });
  },
};
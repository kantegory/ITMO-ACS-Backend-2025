import { Request, Response } from "express";
import { workoutPlanRepository } from "../repositories/workoutPlan.repository";
import { WorkoutPlan } from "../entities/WorkoutPlan";

/**
 * @swagger
 * components:
 *   schemas:
 *     WorkoutPlan:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - level
 *         - duration_weeks
 *       properties:
 *         plan_id:
 *           type: integer
 *           description: The auto-generated ID of the workout plan
 *         title:
 *           type: string
 *           description: The title of the workout plan
 *         description:
 *           type: string
 *           description: The description of the workout plan
 *         level:
 *           type: string
 *           description: The level of the workout plan
 *         duration_weeks:
 *           type: integer
 *           description: The duration of the plan in weeks
 */
export const WorkoutPlanController = {
  /**
   * @swagger
   * /plans:
   *   post:
   *     summary: Create a new workout plan
   *     tags: [WorkoutPlans]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/WorkoutPlan'
   *     responses:
   *       200:
   *         description: The created workout plan
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/WorkoutPlan'
   */
  create: async (req: Request, res: Response) => {
    const plan = await workoutPlanRepository.save(req.body);
    res.json(plan);
  },

  /**
   * @swagger
   * /plans:
   *   get:
   *     summary: Get all workout plans
   *     tags: [WorkoutPlans]
   *     responses:
   *       200:
   *         description: List of all workout plans
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/WorkoutPlan'
   */
  getAll: async (_: Request, res: Response) => {
    const plans = await workoutPlanRepository.find();
    res.json(plans);
  },

  /**
   * @swagger
   * /plans/{id}:
   *   get:
   *     summary: Get a workout plan by ID
   *     tags: [WorkoutPlans]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The workout plan ID
   *     responses:
   *       200:
   *         description: The workout plan
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/WorkoutPlan'
   *       404:
   *         description: Plan not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  getById: async (req: Request, res: Response) => {
    const plan = await workoutPlanRepository.findOneBy({ plan_id: +req.params.id });
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  },

  /**
   * @swagger
   * /plans/{id}:
   *   put:
   *     summary: Update a workout plan by ID
   *     tags: [WorkoutPlans]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The workout plan ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/WorkoutPlan'
   *     responses:
   *       200:
   *         description: Workout plan updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  update: async (req: Request, res: Response) => {
    await workoutPlanRepository.update(req.params.id, req.body);
    res.json({ message: "Plan updated" });
  },

  /**
   * @swagger
   * /plans/{id}:
   *   delete:
   *     summary: Delete a workout plan by ID
   *     tags: [WorkoutPlans]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The workout plan ID
   *     responses:
   *       200:
   *         description: Workout plan deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  delete: async (req: Request, res: Response) => {
    await workoutPlanRepository.delete(req.params.id);
    res.json({ message: "Plan deleted" });
  },
};
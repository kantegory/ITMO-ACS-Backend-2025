import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - age
 *         - gender
 *         - weight
 *         - height
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         registration_date:
 *           type: string
 *           format: date-time
 *           description: The date of registration
 *         age:
 *           type: integer
 *           description: The age of the user
 *         gender:
 *           type: string
 *           description: The gender of the user
 *         weight:
 *           type: number
 *           description: The weight of the user in kilograms
 *         height:
 *           type: number
 *           description: The height of the user in centimeters
 */
export const UserController = {
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: The created user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  create: async (req: Request, res: Response) => {
    const user = await userRepository.save(req.body);
    res.json(user);
  },

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of all users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  getAll: async (_: Request, res: Response) => {
    const users = await userRepository.find();
    res.json(users);
  },

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: User updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  update: async (req: Request, res: Response) => {
    await userRepository.update(req.params.id, req.body);
    res.json({ message: "User updated" });
  },

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user ID
   *     responses:
   *       200:
   *         description: User deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  delete: async (req: Request, res: Response) => {
    await userRepository.delete(req.params.id);
    res.json({ message: "User deleted" });
  },
};

/**
 * @swagger
 * /users/find:
 *   get:
 *     summary: Get a user by ID or email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: The user email
 *     responses:
 *       200:
 *         description: The found user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID or email is required
 *       404:
 *         description: User not found
 */
export const getUserByIdOrEmail = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.query;

    if (!id && !email) {
      return res.status(400).json({ message: "Укажи id или email пользователя" });
    }

    const user = id
      ? await userRepository.findOne({ where: { user_id: Number(id) } })
      : await userRepository.findOne({ where: { email: String(email) } });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    console.error("Ошибка при поиске пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";
import { User } from "../entities/User";
import * as jwt from "jsonwebtoken";

export const UserController = {
  create: async (req: Request, res: Response) => {
    const user = await userRepository.save(req.body);
    res.json(user);
  },
  getAll: async (_: Request, res: Response) => {
    const users = await userRepository.find();
    res.json(users);
  },
  update: async (req: Request, res: Response) => {
    await userRepository.update(req.params.id, req.body);
    res.json({ message: "User updated" });
  },
  delete: async (req: Request, res: Response) => {
    await userRepository.delete(req.params.id);
    res.json({ message: "User deleted" });
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userRepository.findOne({ where: { email } });
    if (!user || user.password !== password) { // В реальном приложении используйте хеширование паролей
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.json({ token });
  },
  verifyToken: async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: number };
      const user = await userRepository.findOne({ where: { user_id: decoded.user_id } });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ user_id: user.user_id, email: user.email });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  },
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
/**
 * @swagger
 * /auth/verify-token:
 *   get:
 *     summary: Verify a JWT token
 *     tags: [Auth]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: Verified user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *       401:
 *         description: Invalid token
 */
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository";
import { publishEvent } from "../utils/rabbitMQ";

interface JwtPayload {
  user_id: number;
}
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
 *           description: The hashed password
 *         age:
 *           type: integer
 *           description: The age of the user
 *         gender:
 *           type: string
 *           description: The gender of the user
 *         weight:
 *           type: number
 *           description: The weight of the user in kg
 *         height:
 *           type: integer
 *           description: The height of the user in cm
 */
export const UserController = {
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Register a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user_id:
   *                   type: integer
   *                 email:
   *                   type: string
   *                 name:
   *                   type: string
   *       400:
   *         description: Invalid input or user already exists
   *       500:
   *         description: Internal server error
   */
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password, age, gender, weight, height } = req.body;
      console.log("Register request:", { name, email, age, gender, weight, height });
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
      }
      console.log("Checking existing user...");
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
      console.log("Hashing password...");
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Saving user to database...");
      const user = await userRepository.save({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        weight,
        height,
      });
      console.log("Publishing user_registered event...");
      await publishEvent("user_registered", {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
      });
      console.log("User registered successfully:", user.user_id);
      res.status(201).json({ user_id: user.user_id, email: user.email, name: user.name });
    } catch (error) {
      console.error("Error registering user:", error.message, error.stack);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login a user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *       401:
   *         description: Invalid credentials
   *       500:
   *         description: Internal server error
   */
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      console.log("Login request:", { email });
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      console.log("Finding user...");
      const user = await userRepository.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      console.log("Generating token...");
      const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error.message, error.stack);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  /**
   * @swagger
   * /auth/verify-token:
   *   get:
   *     summary: Verify JWT token
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
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
   *         description: Invalid token or no token provided
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  verifyToken: async (req: Request, res: Response) => {
    try {
      console.log("Verifying token...");
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      console.log("Finding user by ID:", decoded.user_id);
      const user = await userRepository.findOne({ where: { user_id: decoded.user_id } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user_id: user.user_id, email: user.email });
    } catch (error) {
      console.error("Error verifying token:", error.message, error.stack);
      res.status(401).json({ message: "Invalid token", error: error.message });
    }
  },
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
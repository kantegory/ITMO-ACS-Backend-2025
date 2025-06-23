import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
// @ts-ignore
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      select: ["UserID", "username", "first_name", "last_name", "email", "is_staff", "is_active"]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getAgents = async (req: Request, res: Response) => {
  try {
    const agents = await userRepository.find({
      where: { is_staff: true },
      select: ["UserID", "username", "first_name", "last_name", "email", "is_active"]
    });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agents", error });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await userRepository.find({
      where: { is_staff: false },
      select: ["UserID", "username", "first_name", "last_name", "email", "is_active"]
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { UserID: parseInt(id) } });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, first_name, last_name, email, password, Passport, Phone, BirthDate, is_staff } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = userRepository.create({
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      Passport,
      Phone,
      BirthDate: BirthDate ? new Date(BirthDate) : undefined,
      is_staff: is_staff || false
    });
    
    const savedUser = await userRepository.save(user);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    if (updateData.BirthDate) {
      updateData.BirthDate = new Date(updateData.BirthDate);
    }
    
    await userRepository.update(id, updateData);
    const updatedUser = await userRepository.findOne({ where: { UserID: parseInt(id) } });
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userRepository.delete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const expiresIn: string = process.env.JWT_EXPIRES_IN || "24h";
    const jwtSecret: string = process.env.JWT_SECRET || "fallback-secret";
    const token = (jwt.sign as any)(
      { userId: user.UserID, username: user.username },
      jwtSecret,
      { expiresIn }
    );
    
    res.json({ token, user: { UserID: user.UserID, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
}; 
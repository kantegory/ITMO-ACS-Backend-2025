import { Request, Response, NextFunction } from "express";
import { User } from "../entity/user";
import { AppDataSource } from "../data-source";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, description, roleId } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.description = description;
    user.role = { id: roleId } as any;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find({ relations: ["role"] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const user = await User.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const { name, email, password, description, roleId } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.description = description;
    user.role = { id: roleId } as any;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await user.remove();
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserByIdOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, email } = req.query;

    if (id) {
      const userId = parseInt(id as string, 10);
      if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }
      const user = await User.findOne({
        where: { id: userId },
        relations: ["role"],
      });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
      return;
    }

    if (email) {
      const user = await User.findOne({
        where: { email: email as string },
        relations: ["role"],
      });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
      return;
    }

    res.status(400).json({ message: "Please provide either id or email" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
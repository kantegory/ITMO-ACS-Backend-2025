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
    next(error);
  }
};

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find({ relations: ["role"] });
    res.json(users);
  } catch (error) {
    next(error);
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
    res.json(user);
  } catch (error) {
    next(error);
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
    res.json(user);
  } catch (error) {
    next(error);
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
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
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
      res.json(user);
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
      res.json(user);
      return;
    }

    res.status(400).json({ message: "Please provide either id or email" });
  } catch (err) {
    next(err);
  }
};
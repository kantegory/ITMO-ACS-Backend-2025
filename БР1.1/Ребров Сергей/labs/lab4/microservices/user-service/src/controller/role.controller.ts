import { Request, Response, NextFunction } from "express";
import { Role } from "../entity/role";

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Missing 'name'" });
      return;
    }
    const role = new Role();
    role.name = name;
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoles = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }
    const role = await Role.findOne({ where: { id } });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (isNaN(id) || !name) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }
    const role = await Role.findOne({ where: { id } });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    role.name = name;
    await role.save();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }
    const role = await Role.findOne({ where: { id } });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    await role.remove();
    res.status(204).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

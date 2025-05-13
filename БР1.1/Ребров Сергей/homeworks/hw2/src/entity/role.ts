import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { Request, Response, NextFunction, Router } from "express";

@Entity({ name: "Role" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "role_id" })
  id: number;

  @Column({ type: "varchar", length: 256 })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const role = new Role();
    role.name = name;
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const role = await Role.findOne({ where: { id } });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.json(role);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;

    const role = await Role.findOne({ where: { id } });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }

    role.name = name;
    await role.save();
    res.json(role);
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await Role.findOne({ where: { id } });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }

    await role.remove();
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const router = Router();
router.post("/roles", createRole);
router.get("/roles", getRoles);
router.get("/roles/:id", getRoleById);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);
export { router };

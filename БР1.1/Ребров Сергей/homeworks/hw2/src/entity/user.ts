import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from "typeorm";
import { Role } from "./role";
import { Resume } from "./resume";
import { Job } from "./job";
import { Application } from "./application";
import { Request, Response, NextFunction, Router } from "express";

@Entity({ name: "User" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @Column({ type: "varchar", length: 256 })
  name: string;

  @Column({ type: "varchar", length: 256 })
  email: string;

  @Column({ type: "varchar", length: 256 })
  password: string;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];

  @OneToMany(() => Job, (job) => job.user)
  jobs: Job[];

  @OneToMany(() => Application, (app) => app.user)
  applications: Application[];
}

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

const router = Router();
router.get("/users/search", getUserByIdOrEmail);
router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
export { router };

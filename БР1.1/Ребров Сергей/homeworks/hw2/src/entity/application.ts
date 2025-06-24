import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from "typeorm";
import { User } from "./user";
import { Job } from "./job";
import { Request, Response, NextFunction, Router } from "express";

@Entity({ name: "Application" })
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "application_id" })
  id: number;

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Job, (job) => job.applications)
  @JoinColumn({ name: "job_id" })
  job: Job;

  @Column({ type: "text", name: "cover_letter" })
  coverLetter: string;

  @Column({ type: "varchar", length: 50 })
  status: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export const createApplication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, jobId, coverLetter, status } = req.body;
    const app = new Application();
    app.user = { id: userId } as any;
    app.job = { id: jobId } as any;
    app.coverLetter = coverLetter;
    app.status = status;
    await app.save();
    res.status(201).json(app);
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apps = await Application.find({ relations: ["user", "job"] });
    res.json(apps);
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
	  res.status(400).json({ message: "Invalid ID" });
	  return;
	}
	const app = await Application.findOne({ where: { id }, relations: ["user", "job"] });
    if (!app) {
	  res.status(404).json({ message: "Application not found" });
	  return;
	}
    res.json(app);
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const app = await Application.findOne({ where: { id } });
    if (!app) {
	  res.status(404).json({ message: "Not found" });
	  return;
	}
    app.coverLetter = req.body.coverLetter;
    app.status = req.body.status;
    await app.save();
    res.json(app);
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const app = await Application.findOne({ where: { id } });
    if (!app) {
	  res.status(404).json({ message: "Not found" })
	  return;
	};
    await app.remove();
    res.json({ message: "Application deleted" });
  } catch (error) {
    next(error);
  }
};

const router = Router();
router.post("/applications", createApplication);
router.get("/applications", getApplications);
router.get("/applications/:id", getApplicationById);
router.put("/applications/:id", updateApplication);
router.delete("/applications/:id", deleteApplication);
export { router };

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
import { User } from "./user";
import { Application } from "./application";
import { Request, Response, NextFunction, Router } from "express";

@Entity({ name: "Job" })
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "job_id" })
  id: number;

  @ManyToOne(() => User, (user) => user.jobs)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar", length: 256 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  requirements: string;

  @Column({ type: "int", name: "salary_min" })
  salaryMin: number;

  @Column({ type: "int", name: "salary_max" })
  salaryMax: number;

  @Column({ type: "varchar", length: 256 })
  experience: string;

  @Column({ type: "varchar", length: 256 })
  location: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Application, (app) => app.job)
  applications: Application[];
}

export const createJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, title, description, requirements, salaryMin, salaryMax, experience, location } = req.body;
    const job = new Job();
    job.user = { id: userId } as any;
    job.title = title;
    job.description = description;
    job.requirements = requirements;
    job.salaryMin = salaryMin;
    job.salaryMax = salaryMax;
    job.experience = experience;
    job.location = location;
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const jobs = await Job.find({ relations: ["user", "applications"] });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
	  res.status(400).json({ message: "Invalid ID" });
	  return;
	}
    const job = await Job.findOne({ where: { id }, relations: ["user", "applications"] });
    if (!job) {
	  res.status(404).json({ message: "Job not found" });
	  return;
	}
    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
	  res.status(400).json({ message: "Invalid ID" });
	  return;
	}
    const job = await Job.findOne({ where: { id } });
    if (!job) {
	  res.status(404).json({ message: "Job not found" });
	  return;
	}

    const { title, description, requirements, salaryMin, salaryMax, experience, location } = req.body;
    job.title = title;
    job.description = description;
    job.requirements = requirements;
    job.salaryMin = salaryMin;
    job.salaryMax = salaryMax;
    job.experience = experience;
    job.location = location;
    await job.save();
    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
	  res.status(400).json({ message: "Invalid ID" });
	  return;
	}
    const job = await Job.findOne({ where: { id } });
    if (!job) {
	  res.status(404).json({ message: "Job not found" });
	  return;
	}
    await job.remove();
    res.json({ message: "Job deleted" });
  } catch (error) {
    next(error);
  }
};

const router = Router();
router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);
export { router };

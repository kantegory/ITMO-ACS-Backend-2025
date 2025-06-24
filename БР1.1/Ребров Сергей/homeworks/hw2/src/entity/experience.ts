import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Resume } from "./resume";
import { Request, Response, NextFunction, Router } from "express";

@Entity({ name: "Experience" })
export class Experience extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "experience_id" })
  id: number;

  @ManyToOne(() => Resume, (resume) => resume.experiences)
  @JoinColumn({ name: "resume_id" })
  resume: Resume;

  @Column({ type: "varchar", length: 256 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar", length: 256 })
  company: string;

  @Column({ type: "date", name: "start_date" })
  startDate: Date;

  @Column({ type: "date", name: "end_date", nullable: true })
  endDate: Date | null;
}

export const createExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { resumeId, title, description, company, startDate, endDate } = req.body;
    const exp = new Experience();
    exp.resume = { id: resumeId } as any;
    exp.title = title;
    exp.description = description;
    exp.company = company;
    exp.startDate = new Date(startDate);
    exp.endDate = endDate ? new Date(endDate) : null;
    await exp.save();
    res.status(201).json(exp);
  } catch (error) {
    next(error);
  }
};

export const getExperiences = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const exps = await Experience.find({ relations: ["resume"] });
    res.json(exps);
  } catch (error) {
    next(error);
  }
};

export const getExperienceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const exp = await Experience.findOne({ where: { id }, relations: ["resume"] });
    if (!exp) {
	  res.status(404).json({ message: "Not found" });
	  return;
	}
    res.json(exp);
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const exp = await Experience.findOne({ where: { id } });
    if (!exp) {
	  res.status(404).json({ message: "Not found" });
	  return;
	}

    const { title, description, company, startDate, endDate } = req.body;
    exp.title = title;
    exp.description = description;
    exp.company = company;
    exp.startDate = new Date(startDate);
    exp.endDate = endDate ? new Date(endDate) : null;
    await exp.save();
    res.json(exp);
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const exp = await Experience.findOne({ where: { id } });
    if (!exp) {
	  res.status(404).json({ message: "Not found" });
	  return;
	}
    await exp.remove();
    res.json({ message: "Experience deleted" });
  } catch (error) {
    next(error);
  }
};

const router = Router();
router.post("/experiences", createExperience);
router.get("/experiences", getExperiences);
router.get("/experiences/:id", getExperienceById);
router.put("/experiences/:id", updateExperience);
router.delete("/experiences/:id", deleteExperience);
export { router };

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
import { Job } from "./job";
import { Education } from "./education";
import { Experience } from "./experience";
import { Request, Response, NextFunction, Router } from "express";

@Entity({ name: "Resume" })
export class Resume extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "resume_id" })
  id: number;

  @ManyToOne(() => User, (user) => user.resumes)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar", length: 256 })
  title: string;

  @Column({ type: "text" })
  skills: string;

  @Column({ type: "text", name: "contact_info" })
  contactInfo: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Experience, (exp) => exp.resume)
  experiences: Experience[];

  @OneToMany(() => Education, (edu) => edu.resume)
  educations: Education[];
}

export const createResume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, title, skills, contactInfo } = req.body;
    const resume = new Resume();
    resume.user = { id: userId } as any;
    resume.title = title;
    resume.skills = skills;
    resume.contactInfo = contactInfo;
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    next(error);
  }
};

export const getResumes = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resumes = await Resume.find({ relations: ["user", "experiences", "educations"] });
    res.json(resumes);
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
	  res.status(400).json({ message: "Invalid ID" });
	  return;
	}
    const resume = await Resume.findOne({ where: { id }, relations: ["user", "experiences", "educations"] });
    if (!resume) {
	  res.status(404).json({ message: "Resume not found" });
	  return;
	}
    res.json(resume);
  } catch (error) {
    next(error);
  }
};

export const updateResume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
	  res.status(400).json({ message: "Invalid ID" });
	  return;
	}
    const resume = await Resume.findOne({ where: { id } });
    if (!resume) {
	  res.status(404).json({ message: "Resume not found" })
	  return;
	};

    const { title, skills, contactInfo } = req.body;
    resume.title = title;
    resume.skills = skills;
    resume.contactInfo = contactInfo;
    await resume.save();
    res.json(resume);
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
	  res.status(400).json({ message: "Invalid ID" });
	  return;
	}
    const resume = await Resume.findOne({ where: { id } });
    if (!resume) {
	  res.status(404).json({ message: "Resume not found" })
	  return;
	}
    await resume.remove();
    res.json({ message: "Resume deleted" });
  } catch (error) {
    next(error);
  }
};

const router = Router();
router.post("/resumes", createResume);
router.get("/resumes", getResumes);
router.get("/resumes/:id", getResumeById);
router.put("/resumes/:id", updateResume);
router.delete("/resumes/:id", deleteResume);
export { router };

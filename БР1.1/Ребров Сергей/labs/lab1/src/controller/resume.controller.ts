import { Request, Response, NextFunction } from "express";
import { Resume } from "../entity/resume";

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

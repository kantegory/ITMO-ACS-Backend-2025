import { Request, Response, NextFunction } from "express";
import { Experience } from "../entity/experience";

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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExperiences = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const exps = await Experience.find({ relations: ["resume"] });
    res.status(200).json(exps);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(200).json(exp);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(200).json(exp);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(204).json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

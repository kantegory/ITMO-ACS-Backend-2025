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

import { Request, Response, NextFunction } from "express";
import { Education } from "../entity/education";

export const createEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { resumeId, institution, degree, startDate, endDate } = req.body;
    const edu = new Education();
    edu.resume = { id: resumeId } as any;
    edu.institution = institution;
    edu.degree = degree;
    edu.startDate = new Date(startDate);
    edu.endDate = endDate ? new Date(endDate) : null;
    await edu.save();
    res.status(201).json(edu);
  } catch (error) {
    next(error);
  }
};

export const getEducations = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const edus = await Education.find({ relations: ["resume"] });
    res.json(edus);
  } catch (error) {
    next(error);
  }
};

export const getEducationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const edu = await Education.findOne({ where: { id }, relations: ["resume"] });
    if (!edu) {
	  res.status(404).json({ message: "Not found" });
	  return;
	}
    res.json(edu);
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const edu = await Education.findOne({ where: { id } });
    if (!edu) {
	  res.status(404).json({ message: "Not found" });
	  return;
	}

    const { institution, degree, startDate, endDate } = req.body;
    edu.institution = institution;
    edu.degree = degree;
    edu.startDate = new Date(startDate);
    edu.endDate = endDate ? new Date(endDate) : null;
    await edu.save();
    res.json(edu);
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const edu = await Education.findOne({ where: { id } });
    if (!edu) {
	  res.status(404).json({ message: "Not found" });
	  return;
	}
    await edu.remove();
    res.json({ message: "Education deleted" });
  } catch (error) {
    next(error);
  }
};

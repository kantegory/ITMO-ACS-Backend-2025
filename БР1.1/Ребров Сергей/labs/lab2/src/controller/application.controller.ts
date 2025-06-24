import { Request, Response, NextFunction } from "express";
import { Application } from "../entity/application";

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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApplications = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apps = await Application.find({ relations: ["user", "job"] });
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(200).json(app);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(200).json(app);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(204).json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

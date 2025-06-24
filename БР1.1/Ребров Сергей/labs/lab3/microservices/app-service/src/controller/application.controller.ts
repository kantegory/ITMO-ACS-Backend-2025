import { Request, Response, NextFunction } from "express";
import { Application } from "../entity/application";
import axios from "axios";

export const createApplication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, jobId, coverLetter, status } = req.body;

    let userExists = false;
    try {
      const userRes = await axios.get(`http://localhost:5002/api/users/${userId}`);
      userExists = userRes.status === 200;
    } catch {
      userExists = false;
    }

    if (!userExists) {
      res.status(400).json({ message: "Invalid userId — user not found" });
      return;
    }

    let jobExists = false;
    try {
      const jobRes = await axios.get(`http://localhost:5001/api/jobs/${jobId}`);
      jobExists = jobRes.status === 200;
    } catch {
      jobExists = false;
    }

    if (!jobExists) {
      res.status(400).json({ message: "Invalid jobId — job not found" });
      return;
    }

    const app = new Application();
    app.user = userId;
    app.job = jobId;
    app.coverLetter = coverLetter;
    app.status = status;

    await app.save();
    res.status(201).json(app);
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApplications = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apps = await Application.find();
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
    const app = await Application.findOne({ where: { id } });
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
      res.status(404).json({ message: "Not found" });
      return;
    }

    await app.remove();
    res.status(204).json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
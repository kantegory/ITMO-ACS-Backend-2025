import { Request, Response, NextFunction } from "express";
import { Job } from "../entity/job";

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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJobs = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const jobs = await Job.find({ relations: ["user", "applications"] });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(204).json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

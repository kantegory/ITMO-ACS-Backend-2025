import { Request, Response, NextFunction } from "express";
import { Job } from "../entity/job";
import axios from "axios";

export const createJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, title, description, requirements, salaryMin, salaryMax, experience, location } = req.body;

    const userServiceUrl = process.env.USER_SERVICE_URL;
	
    let userExists = false;
	try {
	  const userRes = await axios.get(`${userServiceUrl}/api/users/${userId}`);
	  userExists = userRes.status === 200;
	} catch {
	  userExists = false;
	}

	if (!userExists) {
	  res.status(400).json({ message: "Invalid userId — user not found" });
	  return;
	}

    const job = new Job();
    job.user = userId;
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
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJobs = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const jobs = await Job.find();
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

    const job = await Job.findOne({ where: { id } });
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

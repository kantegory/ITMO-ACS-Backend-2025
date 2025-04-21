import { Request, Response } from "express"
import { dataSource } from "../models/database"
import { Resume } from "../models/entities"

export const getAllResumes = async (req: Request, res: Response) => {
	const resumes = await dataSource.getRepository(Resume).find()
	res.status(200).json({ resumes })
}

export const getResumeById = async (req: Request, res: Response) => {
	const resume = await dataSource.getRepository(Resume).findOneBy({ id: req.params.id })
	if (!resume) {
		res.status(404).json({ message: "Resume not found" })
		return
	}

	res.status(200).json(resume)
}

export const createResume = async (req: Request, res: Response) => {
	const resume = dataSource.getRepository(Resume).create(req.body)
	const results = await dataSource.getRepository(Resume).save(resume)
	res.status(201).json(results)
}

export const updateResume = async (req: Request, res: Response) => {
	const resume = await dataSource.getRepository(Resume).findOneBy({ id: req.params.id })
	if (!resume) {
		res.status(404).json({ message: "Resume not found" })
		return
	}

	dataSource.getRepository(Resume).merge(resume, req.body)
	const results = await dataSource.getRepository(Resume).save(resume)
	res.status(200).json(results)
}

export const deleteResumeById = async (req: Request, res: Response) => {
	const results = await dataSource.getRepository(Resume).delete({ id: req.params.id })
	res.status(200).json(results)
}

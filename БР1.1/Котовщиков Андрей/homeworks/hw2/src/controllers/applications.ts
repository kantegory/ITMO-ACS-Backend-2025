import { Request, Response } from "express"
import { dataSource } from "../models/database"
import { Application } from "../models/entities"

export const getAllApplications = async (req: Request, res: Response) => {
	const applications = await dataSource.getRepository(Application).find()
	res.status(200).json({ applications })
}

export const getApplicationById = async (req: Request, res: Response) => {
	const application = await dataSource.getRepository(Application).findOneBy({ id: req.params.id })
	if (!application) {
		res.status(404).json({ message: "Application not found" })
		return
	}

	res.status(200).json(application)
}

export const createApplication = async (req: Request, res: Response) => {
	const newApplication = dataSource.getRepository(Application).create(req.body)
	const results = await dataSource.getRepository(Application).save(newApplication)
	res.status(201).json(results)
}

export const updateApplication = async (req: Request, res: Response) => {
	const application = await dataSource.getRepository(Application).findOneBy({ id: req.params.id })
	if (!application) {
		res.status(404).json({ message: "Application not found" })
		return
	}

	dataSource.getRepository(Application).merge(application, req.body)
	const results = await dataSource.getRepository(Application).save(application)
	res.status(200).json(results)
}

export const deleteApplicationById = async (req: Request, res: Response) => {
	const results = await dataSource.getRepository(Application).delete({ id: req.params.id })
	res.status(200).json(results)
}

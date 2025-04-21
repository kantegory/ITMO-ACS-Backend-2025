import { Request, Response } from "express"
import { dataSource } from "../models/database"
import { Vacancy } from "../models/entities"

export const getAllVacancies = async (req: Request, res: Response) => {
	const vacancies = await dataSource.getRepository(Vacancy).find()
	res.status(200).json({ vacancies })
}

export const getVacancyById = async (req: Request, res: Response) => {
	const vacancy = await dataSource.getRepository(Vacancy).findOneBy({ id: req.params.id })
	if (!vacancy) {
		res.status(404).json({ message: "Vacancy not found" })
		return
	}

	res.status(200).json(vacancy)
}

export const createVacancy = async (req: Request, res: Response) => {
	const vacancy = dataSource.getRepository(Vacancy).create(req.body)
	const results = await dataSource.getRepository(Vacancy).save(vacancy)
	res.status(201).json(results)
}

export const updateVacancy = async (req: Request, res: Response) => {
	const vacancy = await dataSource.getRepository(Vacancy).findOneBy({ id: req.params.id })
	if (!vacancy) {
		res.status(404).json({ message: "Vacancy not found" })
		return
	}

	dataSource.getRepository(Vacancy).merge(vacancy, req.body)
	const results = await dataSource.getRepository(Vacancy).save(vacancy)
	res.status(200).json(results)
}

export const deleteVacancyById = async (req: Request, res: Response) => {
	const results = await dataSource.getRepository(Vacancy).delete({ id: req.params.id })
	res.status(200).json(results)
}

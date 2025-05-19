import { Request, Response } from "express"
import { dataSource } from "../models/database"
import { Company } from "../models/entities"

export const getAllCompanies = async (req: Request, res: Response) => {
	const companies = await dataSource.getRepository(Company).find()
	res.status(200).json({ companies })
}

export const getCompanyById = async (req: Request, res: Response) => {
	const company = await dataSource.getRepository(Company).findOneBy({ id: req.params.id })
	if (!company) {
		res.status(404).json({ message: "Company not found" })
		return
	}

	res.status(200).json(company)
}

export const createCompany = async (req: Request, res: Response) => {
	const newComplany = dataSource.getRepository(Company).create(req.body)
	const results = await dataSource.getRepository(Company).save(newComplany)
	res.status(201).json(results)
}

export const updateCompany = async (req: Request, res: Response) => {
	const company = await dataSource.getRepository(Company).findOneBy({ id: req.params.id })
	if (!company) {
		res.status(404).json({ message: "Company not found" })
		return
	}

	dataSource.getRepository(Company).merge(company, req.body)
	const results = await dataSource.getRepository(Company).save(company)
	res.status(200).json(results)
}

export const deleteCompanyById = async (req: Request, res: Response) => {
	const results = await dataSource.getRepository(Company).delete({ id: req.params.id })
	res.status(200).json(results)
}

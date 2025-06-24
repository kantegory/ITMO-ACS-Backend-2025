import { Request, Response } from "express"
import { Repository } from "typeorm"
import { Company } from "../entity/company.entity"
import { myDataSource } from "../app-data-source"

export class CompanyController {
    private repository: Repository<Company>

    constructor() {
        this.repository = myDataSource.getRepository(Company)
    }

    async getAll(req: Request, res: Response) {
        try {
            const items = await this.repository.find({
                relations: ['employer', 'jobOffers']
            })
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching companies" })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await this.repository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ['employer', 'jobOffers']
            })
            if (!item) {
                return res.status(404).json({ message: "Company not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error fetching company" })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const item = this.repository.create(req.body)
            await this.repository.save(item)
            res.status(201).json(item)
        } catch (error) {
            res.status(500).json({ message: "Error creating company" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await this.repository.update(id, req.body)
            const item = await this.repository.findOne({
                where: { id },
                relations: ['employer', 'jobOffers']
            })
            if (!item) {
                return res.status(404).json({ message: "Company not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error updating company" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.repository.delete(parseInt(req.params.id))
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: "Error deleting company" })
        }
    }

    async getByEmployerId(req: Request, res: Response) {
        try {
            const items = await this.repository.find({
                where: { employer: { id: parseInt(req.params.employerId) } },
                relations: ['employer', 'jobOffers']
            })
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching companies" })
        }
    }
} 
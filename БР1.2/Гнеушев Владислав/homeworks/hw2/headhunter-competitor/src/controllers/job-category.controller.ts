import { Request, Response } from "express"
import { Repository } from "typeorm"
import { JobCategory } from "../entity/job-category.entity"
import { myDataSource } from "../app-data-source"

export class JobCategoryController {
    private repository: Repository<JobCategory>

    constructor() {
        this.repository = myDataSource.getRepository(JobCategory)
    }

    async getAll(req: Request, res: Response) {
        try {
            const items = await this.repository.find({
                relations: ['jobOffers']
            })
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching job categories" })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await this.repository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ['jobOffers']
            })
            if (!item) {
                return res.status(404).json({ message: "Job category not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error fetching job category" })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const item = this.repository.create(req.body)
            await this.repository.save(item)
            res.status(201).json(item)
        } catch (error) {
            res.status(500).json({ message: "Error creating job category" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await this.repository.update(id, req.body)
            const item = await this.repository.findOne({
                where: { id },
                relations: ['jobOffers']
            })
            if (!item) {
                return res.status(404).json({ message: "Job category not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error updating job category" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.repository.delete(parseInt(req.params.id))
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: "Error deleting job category" })
        }
    }
} 
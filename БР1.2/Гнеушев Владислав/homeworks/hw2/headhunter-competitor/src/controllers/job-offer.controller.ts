import { Request, Response } from "express"
import { Repository } from "typeorm"
import { JobOffer } from "../entity/job-offer.entity"
import { myDataSource } from "../app-data-source"

export class JobOfferController {
    private repository: Repository<JobOffer>

    constructor() {
        this.repository = myDataSource.getRepository(JobOffer)
    }

    async getAll(req: Request, res: Response) {
        try {
            const items = await this.repository.find({
                relations: ['company', 'jobCategory', 'requiredSkills', 'applications']
            })
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching job offers" })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await this.repository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ['company', 'jobCategory', 'requiredSkills', 'applications']
            })
            if (!item) {
                return res.status(404).json({ message: "Job offer not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error fetching job offer" })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const item = this.repository.create(req.body)
            await this.repository.save(item)
            res.status(201).json(item)
        } catch (error) {
            res.status(500).json({ message: "Error creating job offer" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await this.repository.update(id, req.body)
            const item = await this.repository.findOne({
                where: { id },
                relations: ['company', 'jobCategory', 'requiredSkills', 'applications']
            })
            if (!item) {
                return res.status(404).json({ message: "Job offer not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error updating job offer" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.repository.delete(parseInt(req.params.id))
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: "Error deleting job offer" })
        }
    }

    async getByCompanyId(req: Request, res: Response) {
        try {
            const items = await this.repository.find({
                where: { company: { id: parseInt(req.params.companyId) } },
                relations: ['company', 'jobCategory', 'requiredSkills', 'applications']
            })
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching job offers" })
        }
    }

    async getByCategoryId(req: Request, res: Response) {
        try {
            const items = await this.repository.find({
                where: { jobCategory: { id: parseInt(req.params.categoryId) } },
                relations: ['company', 'jobCategory', 'requiredSkills', 'applications']
            })
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching job offers" })
        }
    }
} 
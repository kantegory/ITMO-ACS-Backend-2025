import { Request, Response } from "express"
import { Repository } from "typeorm"
import { Resume } from "../entity/resume.entity"
import { myDataSource } from "../app-data-source"

export class ResumeController {
    private repository: Repository<Resume>

    constructor() {
        this.repository = myDataSource.getRepository(Resume)
    }

    async getAll(req: Request, res: Response) {
        try {
            const items = await this.repository.find()
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching resumes" })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await this.repository.findOneBy({ id: parseInt(req.params.id) })
            if (!item) {
                return res.status(404).json({ message: "Resume not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error fetching resume" })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const item = this.repository.create(req.body)
            await this.repository.save(item)
            res.status(201).json(item)
        } catch (error) {
            res.status(500).json({ message: "Error creating resume" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await this.repository.update(id, req.body)
            const item = await this.repository.findOneBy({ id })
            if (!item) {
                return res.status(404).json({ message: "Resume not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error updating resume" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.repository.delete(parseInt(req.params.id))
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: "Error deleting resume" })
        }
    }

    async getByEmployeeId(req: Request, res: Response) {
        try {
            const items = await this.repository.find({
                where: { employee: { id: parseInt(req.params.employeeId) } },
                relations: ['employee', 'skills']
            })
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching resumes" })
        }
    }
} 
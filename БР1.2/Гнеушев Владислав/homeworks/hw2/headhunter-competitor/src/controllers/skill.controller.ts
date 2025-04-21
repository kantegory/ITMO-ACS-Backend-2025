import { Request, Response } from "express"
import { Repository } from "typeorm"
import { Skill } from "../entity/skill.entity"
import { myDataSource } from "../app-data-source"

export class SkillController {
    private repository: Repository<Skill>

    constructor() {
        this.repository = myDataSource.getRepository(Skill)
    }

    async getAll(req: Request, res: Response) {
        try {
            const items = await this.repository.find({
                relations: ['resumeSkills', 'jobOfferRequiredSkills']
            })
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching skills" })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await this.repository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ['resumeSkills', 'jobOfferRequiredSkills']
            })
            if (!item) {
                return res.status(404).json({ message: "Skill not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error fetching skill" })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const item = this.repository.create(req.body)
            await this.repository.save(item)
            res.status(201).json(item)
        } catch (error) {
            res.status(500).json({ message: "Error creating skill" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await this.repository.update(id, req.body)
            const item = await this.repository.findOne({
                where: { id },
                relations: ['resumeSkills', 'jobOfferRequiredSkills']
            })
            if (!item) {
                return res.status(404).json({ message: "Skill not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error updating skill" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.repository.delete(parseInt(req.params.id))
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: "Error deleting skill" })
        }
    }
} 
import { Request, Response } from "express"
import { Repository } from "typeorm"
import { EmployeeCabinet } from "../entity/employee-cabinet.entity"
import { myDataSource } from "../app-data-source"

export class EmployeeCabinetController {
    private repository: Repository<EmployeeCabinet>

    constructor() {
        this.repository = myDataSource.getRepository(EmployeeCabinet)
    }

    async getAll(req: Request, res: Response) {
        try {
            const items = await this.repository.find()
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching employee cabinets" })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await this.repository.findOneBy({ id: parseInt(req.params.id) })
            if (!item) {
                return res.status(404).json({ message: "Employee cabinet not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error fetching employee cabinet" })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const item = this.repository.create(req.body)
            await this.repository.save(item)
            res.status(201).json(item)
        } catch (error) {
            res.status(500).json({ message: "Error creating employee cabinet" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await this.repository.update(id, req.body)
            const item = await this.repository.findOneBy({ id })
            if (!item) {
                return res.status(404).json({ message: "Employee cabinet not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error updating employee cabinet" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.repository.delete(parseInt(req.params.id))
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: "Error deleting employee cabinet" })
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const item = await this.repository.findOne({
                where: { user: { id: parseInt(req.params.userId) } },
                relations: ['user', 'resumes', 'applications']
            })
            if (!item) {
                return res.status(404).json({ message: "Employee cabinet not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error fetching employee cabinet" })
        }
    }
} 
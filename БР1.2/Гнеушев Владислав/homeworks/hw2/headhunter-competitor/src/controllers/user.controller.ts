import { Request, Response } from "express"
import { Repository } from "typeorm"
import { User } from "../entity/user.entity"
import { myDataSource } from "../app-data-source"

export class UserController {
    private repository: Repository<User>

    constructor() {
        this.repository = myDataSource.getRepository(User)
    }

    async getAll(req: Request, res: Response) {
        try {
            const items = await this.repository.find()
            res.json(items)
        } catch (error) {
            res.status(500).json({ message: "Error fetching users" })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const item = await this.repository.findOneBy({ id: parseInt(req.params.id) })
            if (!item) {
                return res.status(404).json({ message: "User not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error fetching user" })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const item = this.repository.create(req.body)
            await this.repository.save(item)
            res.status(201).json(item)
        } catch (error) {
            res.status(500).json({ message: "Error creating user" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await this.repository.update(id, req.body)
            const item = await this.repository.findOneBy({ id })
            if (!item) {
                return res.status(404).json({ message: "User not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error updating user" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.repository.delete(parseInt(req.params.id))
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: "Error deleting user" })
        }
    }

    async getByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email
            const item = await this.repository.findOneBy({ email })
            if (!item) {
                return res.status(404).json({ message: "User not found" })
            }
            res.json(item)
        } catch (error) {
            res.status(500).json({ message: "Error fetching user by email" })
        }
    }
} 
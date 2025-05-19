import { Request, Response } from "express"
import { dataSource } from "../models/database"
import { User } from "../models/entities"

export const getUserById = async (req: Request, res: Response) => {
	const user = await dataSource.getRepository(User).findOneBy({ id: req.params.id })
	if (!user) {
		res.status(404).json({ message: "User not found" })
		return
	}

	res.status(200).json(user)
}

export const getUserByEmail = async (req: Request, res: Response) => {
	const { email } = req.query
	if (!email) {
		res.status(400).json({ message: "Missing email query param" })
		return
	}

	const user = await dataSource.getRepository(User).findOneBy({ email: email as string })
	if (!user) {
		res.status(400).json({ message: "User not found" })
		return
	}

	res.status(200).json(user)
}

export const createUser = async (req: Request, res: Response) => {
	const newUser = dataSource.getRepository(User).create(req.body)
	const results = await dataSource.getRepository(User).save(newUser)
	res.status(201).json(results)
}

export const updateUser = async (req: Request, res: Response) => {
	const user = await dataSource.getRepository(User).findOneBy({
		id: req.params.id,
	})

	if (!user) {
		res.status(400).json({ message: "User not found" })
		return
	}

	dataSource.getRepository(User).merge(user, req.body)
	const results = await dataSource.getRepository(User).save(user)
	res.status(200).json(results)
}

export const deleteUserById = async (req: Request, res: Response) => {
	const results = await dataSource.getRepository(User).delete(req.params.id)
	res.status(200).json(results)
}

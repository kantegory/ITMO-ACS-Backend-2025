import { Request, Response } from "express"
import * as userService from "../services/userService"

export const getAll = async (_: Request, res: Response) => {
  const users = await userService.getAllUsers()
  res.json(users)
}

export const getById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(Number(req.params.id))
  user ? res.json(user) : res.status(404).json({ error: "User not found" })
}

export const getByEmail = async (req: Request, res: Response) => {
  const user = await userService.getUserByEmail(req.params.email)
  user ? res.json(user) : res.status(404).json({ error: "User not found" })
}

export const create = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body)
  res.status(201).json(user)
}

export const update = async (req: Request, res: Response) => {
  const updated = await userService.updateUser(Number(req.params.id), req.body)
  res.json(updated)
}

export const remove = async (req: Request, res: Response) => {
  await userService.deleteUser(Number(req.params.id))
  res.status(204).send()
}

import { Request, Response } from "express"
import * as service from "../services/blogCommentService"

export const getAll = async (_: Request, res: Response) => {
  const items = await service.getAll()
  res.json(items)
}

export const getById = async (req: Request, res: Response) => {
  const item = await service.getById(Number(req.params.id))
  item ? res.json(item) : res.status(404).json({ error: "Not found" })
}

export const create = async (req: Request, res: Response) => {
  const item = await service.create(req.body)
  res.status(201).json(item)
}

export const update = async (req: Request, res: Response) => {
  const updated = await service.update(Number(req.params.id), req.body)
  res.json(updated)
}

export const remove = async (req: Request, res: Response) => {
  await service.remove(Number(req.params.id))
  res.status(204).send()
}

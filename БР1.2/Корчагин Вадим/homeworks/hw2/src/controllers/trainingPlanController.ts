import { Request, Response } from "express"
import * as service from "../services/trainingPlanService"

export const getAll = async (_: Request, res: Response) => {
  const plans = await service.getAllTrainingPlans()
  res.json(plans)
}

export const getById = async (req: Request, res: Response) => {
  const plan = await service.getTrainingPlanById(Number(req.params.id))
  plan ? res.json(plan) : res.status(404).json({ error: "Plan not found" })
}

export const create = async (req: Request, res: Response) => {
  const plan = await service.createTrainingPlan(req.body)
  res.status(201).json(plan)
}

export const update = async (req: Request, res: Response) => {
  const updated = await service.updateTrainingPlan(Number(req.params.id), req.body)
  res.json(updated)
}

export const remove = async (req: Request, res: Response) => {
  await service.deleteTrainingPlan(Number(req.params.id))
  res.status(204).send()
}

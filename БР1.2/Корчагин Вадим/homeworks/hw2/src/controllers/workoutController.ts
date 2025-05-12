import { Request, Response } from "express"
import * as workoutService from "../services/workoutService"

export const getAll = async (_: Request, res: Response) => {
  const workouts = await workoutService.getAllWorkouts()
  res.json(workouts)
}

export const getById = async (req: Request, res: Response) => {
  const workout = await workoutService.getWorkoutById(Number(req.params.id))
  workout ? res.json(workout) : res.status(404).json({ error: "Workout not found" })
}

export const create = async (req: Request, res: Response) => {
  const workout = await workoutService.createWorkout(req.body)
  res.status(201).json(workout)
}

export const update = async (req: Request, res: Response) => {
  const updated = await workoutService.updateWorkout(Number(req.params.id), req.body)
  res.json(updated)
}

export const remove = async (req: Request, res: Response) => {
  await workoutService.deleteWorkout(Number(req.params.id))
  res.status(204).send()
}

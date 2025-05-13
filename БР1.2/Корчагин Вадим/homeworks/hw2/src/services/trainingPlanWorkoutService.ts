import { AppDataSource } from "../data-source"
import { TrainingPlanWorkout } from "../entities/TrainingPlanWorkout"

const repo = AppDataSource.getRepository(TrainingPlanWorkout)

export const getAll = () => repo.find({ relations: ["training_plan", "workout"] })

export const getById = (id: number) =>
  repo.findOne({ where: { id }, relations: ["training_plan", "workout"] })

export const create = (data: Partial<TrainingPlanWorkout>) => {
  const item = repo.create(data)
  return repo.save(item)
}

export const update = async (id: number, data: Partial<TrainingPlanWorkout>) => {
  await repo.update(id, data)
  return getById(id)
}

export const remove = (id: number) => repo.delete(id)

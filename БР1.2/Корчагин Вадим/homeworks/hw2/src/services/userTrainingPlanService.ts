import { AppDataSource } from "../data-source"
import { UserTrainingPlan } from "../entities/UserTrainingPlan"

const repo = AppDataSource.getRepository(UserTrainingPlan)

export const getAll = () =>
  repo.find({ relations: ["user", "training_plan"] })

export const getById = (id: number) =>
  repo.findOne({ where: { id }, relations: ["user", "training_plan"] })

export const create = (data: Partial<UserTrainingPlan>) => {
  const record = repo.create(data)
  return repo.save(record)
}

export const update = async (id: number, data: Partial<UserTrainingPlan>) => {
  await repo.update(id, data)
  return getById(id)
}

export const remove = (id: number) => repo.delete(id)

import { AppDataSource } from "../data-source"
import { TrainingPlan } from "../entities/TrainingPlan"

const repo = AppDataSource.getRepository(TrainingPlan)

export const getAllTrainingPlans = () => repo.find()

export const getTrainingPlanById = (id: number) =>
  repo.findOne({ where: { id } })

export const createTrainingPlan = (data: Partial<TrainingPlan>) => {
  const plan = repo.create(data)
  return repo.save(plan)
}

export const updateTrainingPlan = async (id: number, data: Partial<TrainingPlan>) => {
  await repo.update(id, data)
  return getTrainingPlanById(id)
}

export const deleteTrainingPlan = (id: number) => repo.delete(id)

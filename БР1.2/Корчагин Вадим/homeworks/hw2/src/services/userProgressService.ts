import { AppDataSource } from "../data-source"
import { UserProgress } from "../entities/UserProgress"

const repo = AppDataSource.getRepository(UserProgress)

export const getAll = () =>
  repo.find({ relations: ["user"] })

export const getById = (id: number) =>
  repo.findOne({ where: { id }, relations: ["user"] })

export const create = (data: Partial<UserProgress>) => {
  const record = repo.create(data)
  return repo.save(record)
}

export const update = async (id: number, data: Partial<UserProgress>) => {
  await repo.update(id, data)
  return getById(id)
}

export const remove = (id: number) => repo.delete(id)

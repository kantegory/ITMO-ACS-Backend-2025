import { AppDataSource } from "../data-source"
import { Role } from "../entities/Role"

const repo = AppDataSource.getRepository(Role)

export const getAll = () => repo.find()

export const getById = (id: number) => repo.findOne({ where: { id } })

export const create = (data: Partial<Role>) => {
  const role = repo.create(data)
  return repo.save(role)
}

export const update = async (id: number, data: Partial<Role>) => {
  await repo.update(id, data)
  return getById(id)
}

export const remove = (id: number) => repo.delete(id)

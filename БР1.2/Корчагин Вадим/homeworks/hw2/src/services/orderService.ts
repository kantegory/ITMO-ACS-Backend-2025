import { AppDataSource } from "../data-source"
import { Order } from "../entities/Order"

const repo = AppDataSource.getRepository(Order)

export const getAll = () =>
  repo.find({ relations: ["user", "payments"] })

export const getById = (id: number) =>
  repo.findOne({ where: { id }, relations: ["user", "payments"] })

export const create = (data: Partial<Order>) => {
  const order = repo.create(data)
  return repo.save(order)
}

export const update = async (id: number, data: Partial<Order>) => {
  await repo.update(id, data)
  return getById(id)
}

export const remove = (id: number) => repo.delete(id)

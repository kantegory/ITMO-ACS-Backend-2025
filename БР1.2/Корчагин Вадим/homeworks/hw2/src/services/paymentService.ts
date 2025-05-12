import { AppDataSource } from "../data-source"
import { Payment } from "../entities/Payment"

const repo = AppDataSource.getRepository(Payment)

export const getAll = () =>
  repo.find({ relations: ["order"] })

export const getById = (id: number) =>
  repo.findOne({ where: { id }, relations: ["order"] })

export const create = (data: Partial<Payment>) => {
  const payment = repo.create(data)
  return repo.save(payment)
}

export const update = async (id: number, data: Partial<Payment>) => {
  await repo.update(id, data)
  return getById(id)
}

export const remove = (id: number) => repo.delete(id)

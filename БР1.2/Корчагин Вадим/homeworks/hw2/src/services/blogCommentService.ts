import { AppDataSource } from "../data-source"
import { BlogComment } from "../entities/BlogComment"

const repo = AppDataSource.getRepository(BlogComment)

export const getAll = () =>
  repo.find({ relations: ["user", "post"] })

export const getById = (id: number) =>
  repo.findOne({ where: { id }, relations: ["user", "post"] })

export const create = (data: Partial<BlogComment>) => {
  const comment = repo.create(data)
  return repo.save(comment)
}

export const update = async (id: number, data: Partial<BlogComment>) => {
  await repo.update(id, data)
  return getById(id)
}

export const remove = (id: number) => repo.delete(id)

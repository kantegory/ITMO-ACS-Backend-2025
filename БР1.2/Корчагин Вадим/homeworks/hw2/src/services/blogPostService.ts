import { AppDataSource } from "../data-source"
import { BlogPost } from "../entities/BlogPost"

const repo = AppDataSource.getRepository(BlogPost)

export const getAll = () =>
  repo.find({ relations: ["author"] })

export const getById = (id: number) =>
  repo.findOne({ where: { id }, relations: ["author"] })

export const create = (data: Partial<BlogPost>) => {
  const post = repo.create(data)
  return repo.save(post)
}

export const update = async (id: number, data: Partial<BlogPost>) => {
  await repo.update(id, data)
  return getById(id)
}

export const remove = (id: number) => repo.delete(id)

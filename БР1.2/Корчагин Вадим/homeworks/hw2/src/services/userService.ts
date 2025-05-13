import { AppDataSource } from "../data-source"
import { User } from "../entities/User"

const userRepo = AppDataSource.getRepository(User)

export const getAllUsers = () => userRepo.find({ relations: ["role"] })

export const getUserById = (id: number) =>
  userRepo.findOne({ where: { id }, relations: ["role"] })

export const getUserByEmail = (email: string) =>
  userRepo.findOne({ where: { email }, relations: ["role"] })

export const createUser = (data: Partial<User>) => {
  const user = userRepo.create(data)
  return userRepo.save(user)
}

export const updateUser = async (id: number, data: Partial<User>) => {
  await userRepo.update(id, data)
  return getUserById(id)
}

export const deleteUser = (id: number) => userRepo.delete(id)

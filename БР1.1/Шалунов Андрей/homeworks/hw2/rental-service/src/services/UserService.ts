import { dataSource } from "../DataSource";
import { User } from "../models/User";

const userRepo = dataSource.getRepository(User);

export const createUser = async (data: Partial<User>) => {
    const user = userRepo.create(data);
    return userRepo.save(user);
}

export const getAllUsers = async () => {
    return userRepo.find();
}

export const getUserById = async (id: number) => {
    return userRepo.findOneBy({ user_id: id });
}

export const getUserByEmail = async (email: string) => {
    return userRepo.findOneBy({ email });
}

export const updateUser = async (id: number, data: Partial<User>) => {
    await userRepo.update({ user_id: id }, data);
    return getUserById(id);
}

export const deleteUser = async (id: number) => {
    return userRepo.delete({ user_id: id });
}
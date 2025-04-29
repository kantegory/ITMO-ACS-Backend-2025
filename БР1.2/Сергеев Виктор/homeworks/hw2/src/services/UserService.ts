import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export class UserService {
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    getAllUsers = async(): Promise<Array<User>> => {
        return this.repository.find();
    }

    getUserById = async (id: number): Promise<User | null> => {
        return this.repository.findOneBy({id: id});
    }

    createUser = async (data: Partial<User>): Promise<User> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateUser = async (id: number, data: Partial<User>): Promise<User | null> => {
        const entity = await this.getUserById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteUser = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}
import dataSource from "../config/data-source";
import {UserEntity} from "../entities/user.entity";
import {User} from "../models/models/user.model";
import {toUser} from "../mappers/user.mapper";
import {RegisterRequestModel} from "../models/requests/auth/register-request.model";
import {UpdateUserRequestModel} from "../models/requests/user/user-update-request.model";
import {EntityNotFoundError} from "@rent/shared";
import hashPassword from "../utils/hash-password";

class UserService {
    private repository = dataSource.getRepository(UserEntity);

    public async getUsers(): Promise<User[]> {
        return await this.repository.find().then(users => users.map(toUser))
    }

    public async getUserById(id: number): Promise<User> {
        const user = await this.repository.findOneBy({id: id});
        if (!user) {
            throw new EntityNotFoundError(UserEntity, id, "id");
        }
        return toUser(user);
    }

    public async getUserByMail(mail: string): Promise<User> {
        const user = await this.repository.findOneBy({mail: mail})
        if (!user) {
            throw new EntityNotFoundError(UserEntity, mail, "mail");
        }
        return toUser(user);
    }

    public async create(data: RegisterRequestModel): Promise<User> {
        data.password = hashPassword(data.password);
        const createdUSer = this.repository.create(data);
        const savedUser = await this.repository.save(createdUSer);
        return toUser(savedUser);
    }

    public async update(id: number, update: UpdateUserRequestModel): Promise<User> {
        const user = await this.getUserById(id)
        Object.assign(user, update);
        const updatedUser = await this.repository.save(user);
        return toUser(updatedUser);
    }

    public async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    public async existsByEmail(mail: string): Promise<boolean> {
        const user = await this.repository.findOneBy({mail: mail});
        return !!user;
    }
}

export default new UserService();
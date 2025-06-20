import dataSource from "../config/data-source";
import {UserEntity} from "../entities/user.entity";
import {User} from "../models/user.model";
import EntityNotFoundError from "../errors/entity-not-found.error";
import {toUser} from "../mappers/user.mapper";

class UserService {
    private repository = dataSource.getRepository(UserEntity);

    public async getUsers(): Promise<User[] | any> {
        return await this.repository.find().then(users => users.map(toUser))
    }

    public async getUserById(id: number): Promise<User | any> {
        const user = await this.repository.findOneBy({id: id});
        if (!user) {
            throw new EntityNotFoundError(UserEntity, id, "id");
        }
        return toUser(user);
    }

    public async getUserByMail(mail: string): Promise<User | any> {
        const user = await this.repository.findOneBy({mail: mail})
        if (!user) {
            throw new EntityNotFoundError(UserEntity, mail, "mail");
        }
        return toUser(user);
    }

    public async create(user: UserEntity): Promise<User | any> {
        const savedUser = await this.repository.save(user);
        return toUser(savedUser);
    }

    public async update(id: number, update: Partial<User>): Promise<User> {
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
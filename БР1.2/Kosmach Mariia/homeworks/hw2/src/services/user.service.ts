import dataSource from "../config/data-source";
import {UserEntity} from "../models/user.entity";
import EntityNotFoundError from "../errors/entity-not-found.error";

class UserService {

    private repository = dataSource.getRepository(UserEntity);

    async getUserById(id: number) {
        const user = await this.repository.findOneBy({id: id});
        if (!user) {
            throw new EntityNotFoundError(UserEntity, id, "id");
        }
        return user;
    }

    async getUserByMail(mail: string) {
        const user = await this.repository.findOneBy({mail: mail})
        if (!user) {
            throw new EntityNotFoundError(UserEntity, mail, "mail");
        }
        return user;
    }
}

export default new UserService();
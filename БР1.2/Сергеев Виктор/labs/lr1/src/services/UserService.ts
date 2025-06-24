import { User } from "../models/User";
import { BaseCRUDService } from "../common/BaseCRUDService";

export class UserService extends BaseCRUDService<User> {
    constructor() {
        super(User);
    }

    getEntityByUsername = async (username: string): Promise<User> => {
        return this.repository.findOneBy({username: username})
    }
}
import { BaseService } from './base';
import dataSource from '../config/data-source';
import { User } from '../models/User';


export class UserService extends BaseService<User> {
    constructor() {
        super(dataSource.getRepository(User));
    }

    public async getByEmail(email: string): Promise<User | null> {
        return this.repo.findOneBy({ email });
    }
}

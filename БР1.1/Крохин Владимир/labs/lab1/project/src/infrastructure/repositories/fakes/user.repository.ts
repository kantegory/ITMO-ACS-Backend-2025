import { UserModel } from '../../../application/domain/user.model';
import { BaseFakeRepository } from './base.repository';
import { UserRepository } from '../interfaces/user.repository';

export class FakeUserRepository extends BaseFakeRepository<UserModel> implements UserRepository {
    async findByEmail(email: string): Promise<UserModel | null> {
        return this.items.find(user => user.username === email) || null;
    }
} 
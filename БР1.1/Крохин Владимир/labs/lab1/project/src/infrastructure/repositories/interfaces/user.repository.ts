import { UserModel } from '../../../application/domain/user.model';

export interface UserRepository {
    findById(id: number): Promise<UserModel | null>;
    findByEmail(email: string): Promise<UserModel | null>;
    findByUsername(username: string): Promise<UserModel | null>;
    save(user: UserModel): Promise<UserModel>;
    delete(id: number): Promise<void>;
} 
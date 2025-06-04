import { UserModel } from '../domain/user.model';

export class UserService {
    createUser(username: string, password: string): UserModel {
        return new UserModel(null, username, password);
    }

    updateUser(user: UserModel, username?: string, password?: string): void {
        if (username) {
            user.username = username;
        }
        if (password) {
            user.password = password;
        }
    }
} 
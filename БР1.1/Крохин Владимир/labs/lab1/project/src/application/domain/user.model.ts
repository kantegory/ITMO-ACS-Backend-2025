import { BaseModel } from './base.model';
import { UserRole } from './user-role.enum';

export class UserModel extends BaseModel {
    constructor(
        id: number | null,
        private _username: string,
        private _password: string,
        private _role: UserRole = UserRole.USER
    ) {
        super(id);
        this.validateUsername(_username);
        this.validatePassword(_password);
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this.validateUsername(value);
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this.validatePassword(value);
        this._password = value;
    }

    get role(): UserRole {
        return this._role;
    }

    set role(value: UserRole) {
        this._role = value;
    }

    private validateUsername(username: string): void {
        if (!username || username.trim().length < 3) {
            throw new Error('Имя пользователя должно содержать минимум 3 символа');
        }
    }

    private validatePassword(password: string): void {
        if (!password || password.length < 6) {
            throw new Error('Пароль должен содержать минимум 6 символов');
        }
    }
} 
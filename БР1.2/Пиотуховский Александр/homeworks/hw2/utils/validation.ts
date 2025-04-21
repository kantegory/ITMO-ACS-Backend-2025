import { Repository } from 'typeorm';
import { User } from '../models/User';

/**
 * Набор для сбора ошибок валидации
 */
export class ValidationErrors {
    isError = false;
    errors: Record<string, string[]> = {};

    addError(field: string, message: string) {
        this.isError = true;
        if (!this.errors[field]) {
            this.errors[field] = [];
        }
        this.errors[field].push(message);
    }
}

/**
 * Исключение, выбрасываемое при наличии ошибок валидации
 */
export class ValidationException extends Error {
    public readonly statusCode = 422;
    constructor(public readonly errors: Record<string, string[]>) {
        super('Validation failed');
    }
}

/**
 * Проверка username:
 *  - длина >= 5;
 *  - содержит только латинские буквы, цифры, точку и нижнее подчёркивание;
 *  - не начинается и не заканчивается спецсимволом;
 *  - не содержит подряд несколько спецсимволов;
 *  - уникален в базе.
 */
export async function validateUsername(
    username: string,
    errors: ValidationErrors,
    userRepo: Repository<User>
): Promise<void> {
    if (username.length < 5) {
        errors.addError('username', 'Username must be at least 5 characters long.');
    }
    const usernameRegex = /^(?![._])(?!.*[._]{2})[A-Za-z0-9._]+(?<![._])$/;
    if (!usernameRegex.test(username)) {
        errors.addError(
            'username',
            'Username contains invalid characters or improper special symbol placement.'
        );
    }
    const existing = await userRepo.findOne({ where: { username } });
    if (existing) {
        errors.addError('username', 'Username already exists.');
    }
}

/**
 * Проверка email:
 *  - корректная маска;
 *  - уникален в базе.
 */
export async function validateEmail(
    email: string,
    errors: ValidationErrors,
    userRepo: Repository<User>
): Promise<void> {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    if (!emailRegex.test(email)) {
        errors.addError('email', 'Email address is invalid.');
    }
    const existing = await userRepo.findOne({ where: { email } });
    if (existing) {
        errors.addError('email', 'Email already registered.');
    }
}

/**
 * Проверка пароля:
 *  - длина >= 8;
 *  - хотя бы одна заглавная, строчная буква и цифра.
 */
export function validatePassword(
    password: string,
    errors: ValidationErrors
): void {
    if (password.length < 8) {
        errors.addError('password', 'Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
        errors.addError('password', 'Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
        errors.addError('password', 'Password must contain at least one lowercase letter.');
    }
    if (!/\d/.test(password)) {
        errors.addError('password', 'Password must contain at least one digit.');
    }
}

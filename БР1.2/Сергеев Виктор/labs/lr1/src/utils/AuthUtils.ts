import { DeepPartial } from "typeorm";
import { UserService } from "../services/UserService";
import { ValidationErrors } from "./ValidationErrors";
import { UserLogin, UserRegister } from "../models/User";
import { validateCreateUsername, validatePassword, validateUsername } from "./UserUtils";
import bcrypt = require("bcrypt");

export const hashPassword = (
    password: string
): string => {
    const hash = bcrypt.hashSync(password, 12)
    return hash
}

export const checkPassword = (
    password: string,
    passwordHash: string
): boolean => {
    return bcrypt.compareSync(password, passwordHash);
}

export const validatePasswordConfirm = (
    password1: string,
    password2: string,
    errors: ValidationErrors
): void => {
    if (password1 !== password2 || !password1) {
        errors.addError(
            "password confirm",
            "password confirm must be same as password"
        );
    }
}

export const validateRegister = async (
    data: DeepPartial<UserRegister>,
    errors: ValidationErrors,
    service: UserService
): Promise<void> => {
    if (!data.username) {
        errors.addError(
            "username",
            "username is required"
        )
    } else {
        await validateCreateUsername(data.username, errors, service);
    }

    if (!data.password) {
        errors.addError(
            "password",
            "password is required"
        )
    } else {
        validatePassword(data.password, errors);
    }

    if (!data.password_confirm) {
        errors.addError(
            "password_confirm",
            "password_confirm is required"
        )
    } else {
        validatePasswordConfirm(data.password, data.password_confirm, errors);
    }
}

export const validateLogin = (
    data: DeepPartial<UserLogin>,
    errors: ValidationErrors,
): void => {
    if (!data.username) {
        errors.addError(
            "username",
            "username is required"
        )
    } else {
        validateUsername(data.username, errors);
    }

    if (!data.password) {
        errors.addError(
            "password",
            "password is required"
        )
    }
}

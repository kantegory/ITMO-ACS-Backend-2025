import { DeepPartial } from "typeorm";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import { ValidationErrors } from "./ValidationErrors";

export const validateCreateUsername = async (
    username: string,
    errors: ValidationErrors,
    service: UserService
): Promise<void> => {
    if (username.length < 8 || username.length > 50) {
        errors.addError(
            "username",
            "username length must be between 8 and 50"
        );
    }
    const usernameRegex = new RegExp("^([\\w\\d\\-\\.]*)$");
    if (!usernameRegex.test(username)) {
        errors.addError(
            "username",
            "username contains invalid symbols"
        );
    }

    if (await service.getEntityByUsername(username)) {
        errors.addError(
            "username",
            "username already exists"
        );
    }
}

export const validateUsername = async (
    username: string,
    errors: ValidationErrors,
): Promise<void> => {
    if (username.length < 8 || username.length > 50) {
        errors.addError(
            "username",
            "username length must be between 8 and 50"
        );
    }
    const usernameRegex = new RegExp("^([\\w\\d\\-\\.]*)$");
    if (!usernameRegex.test(username)) {
        errors.addError(
            "username",
            "username contains invalid symbols"
        );
    }
}

export const validatePassword = (
    password: string,
    errors: ValidationErrors
): void => {
    if (password.length < 8 || password.length > 100) {
        errors.addError(
            "password",
            "password length must be between 8 and 100 characters"
        )
    }
}

export const validateAvatarUrl = (
    url: string,
    errors: ValidationErrors
): void => {
    if (url.length > 200) {
        errors.addError(
            "avatar_url",
            "avatar url length must be not more than 200 characters"
        )
    }

    const urlRegex = new RegExp("/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/")
    if (!urlRegex.test(url)) {
        errors.addError(
            "avatar_url", 
            "url is invalid"
        )
    }
}

export const validateUser = async (
    data: DeepPartial<User>,
    errors: ValidationErrors,
    service: UserService
): Promise<void> => {
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
    } else {
        validatePassword(data.password, errors);
    }

    if (data.avatar_url) {
        validateAvatarUrl(data.avatar_url, errors)
    }
}


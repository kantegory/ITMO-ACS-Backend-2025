import jwt from 'jsonwebtoken'
import {ApiError} from "../error/ApiError";
import {SETTINGS} from "../config/settings";
import {errorMessages} from "../error/errorMessages";
import {Action} from 'routing-controllers';

export const authorizationChecker = async (action: Action, roles: string[]) => {
    try {
        const token = action.request.headers.authorization?.split(' ')[1]
        if (!token) {
            throw ApiError.forbidden(errorMessages.unauthorized)
        }
        const decoded = jwt.verify(token, SETTINGS.JWT_SECRET_KEY)
        action.request.user = Object(decoded)
        return true
    } catch (e) {
        throw ApiError.forbidden(errorMessages.unauthorized)
    }
}


import jwt from 'jsonwebtoken'
import SETTINGS from "../config/settings";
import {UserTokenPayload} from "../models/models/user-token-payload.model";

export function verifyToken(token: string): UserTokenPayload {
    const decoded = jwt.verify(token, SETTINGS.JWT_SECRET_KEY) as any
    const user = decoded?.user as UserTokenPayload

    if (!user?.id || !user?.mail) {
        throw new Error('Invalid token payload')
    }

    return user
}

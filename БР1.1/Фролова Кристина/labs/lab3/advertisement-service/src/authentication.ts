import {Unauthorized} from "http-errors";
import * as express from 'express';
import {UserTokenPayload, verifyToken} from "@rent/shared";

export function expressAuthentication(
    req: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<UserTokenPayload> {
    const authHeader = req.headers.authorization

    console.log(authHeader)
    if (!authHeader?.startsWith('Bearer ')) {
        throw new Unauthorized('No token provided')
    }

    const token = authHeader.slice(7)

    return new Promise((resolve, reject) => {
        try {
            const user = verifyToken(token)
            resolve(user)
        } catch (err) {
            reject(new Unauthorized('Invalid token'))
        }
    })
}
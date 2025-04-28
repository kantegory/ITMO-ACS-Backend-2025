import express from "express";
import jwt from "jsonwebtoken";
import SETTINGS from "./config/settings";
import {Forbidden, Unauthorized} from "http-errors";
import {User} from "./models/User";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<User> {
    if (securityName === "jwt") {
        const authHeader = request.headers["authorization"];

        if (!authHeader) {
            throw new Unauthorized("Unauthorized: no authorization provided")
        }
        const token = typeof authHeader === "string" && authHeader.startsWith(`${SETTINGS.JWT_TOKEN_TYPE} `)
            ? authHeader.slice(7)
            : authHeader || request.body.token || request.query.token || request.headers["x-access-token"];
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Unauthorized("Unauthorized: no token provided"));
            }
            jwt.verify(token, SETTINGS.JWT_SECRET_KEY, function (err: any, decoded: any) {
                if (err) {
                    return reject(new Unauthorized("Invalid token"));
                }
                for (let scope of scopes ?? []) {
                    if (!decoded?.scopes?.includes(scope)) {
                        return reject(new Forbidden("JWT does not contain required scope."));
                    }
                }
                const user: User | undefined = decoded?.user;

                if (!user?.id || !user?.mail) {
                    return reject(new Unauthorized("Invalid token payload"));
                }

                resolve(user);
            });
        });
    }
    return Promise.reject({});
}
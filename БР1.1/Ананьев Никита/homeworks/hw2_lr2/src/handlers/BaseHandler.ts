import { Router, Response, Request } from "express"

export enum HttpCodes {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    VALIDATION_ERROR = 422,
    INTERNAL_SERVER_ERROR = 500,
}


export abstract class BaseHandler {
    public readonly router: Router = Router()
    protected abstract initRoutes(): void

    constructor(){
        this.initRoutes()
    }

    protected success(response: Response, data: any, status: HttpCodes) {
        response.status(status).json({
            data
        })
    }

    protected error(response: Response, status: HttpCodes, message: string) {
        response.status(status).json({
            message: message
        })
    }
}

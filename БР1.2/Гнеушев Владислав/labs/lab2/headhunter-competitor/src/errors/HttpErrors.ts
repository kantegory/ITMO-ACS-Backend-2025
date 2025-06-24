export class HttpError extends Error {
    public statusCode: number;
    public details?: any;

    constructor(statusCode: number, message: string, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string = 'Bad Request', details?: any) {
        super(400, message, details);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string = 'Conflict', details?: any) {
        super(409, message, details);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

export class ValidationError extends HttpError {
    constructor(errors: any, message: string = 'Validation failed') {
        super(400, message, errors);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = 'Internal Server Error', details?: any) {
        super(500, message, details);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = 'Unauthorized', details?: any) {
        super(401, message, details);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
} 
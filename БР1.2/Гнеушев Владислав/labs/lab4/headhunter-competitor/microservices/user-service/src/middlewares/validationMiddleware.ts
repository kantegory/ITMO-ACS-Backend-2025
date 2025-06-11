import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validate, ValidationError as ClassValidatorError } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';

export class HttpValidationError extends Error {
    public statusCode: number;
    public errors: any[];

    constructor(errors: any[], message: string = 'Input validation failed') {
        super(message);
        this.statusCode = 400;
        this.errors = errors;
        Object.setPrototypeOf(this, HttpValidationError.prototype);
    }
}

export const validationMiddleware = <T extends object>(
    dtoClass: ClassConstructor<T>,
    skipMissingProperties = false,
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body || typeof req.body !== 'object') {
            return next(new HttpValidationError([], 'Request body is missing or not an object.'));
        }

        const dtoInstance = plainToInstance(dtoClass, req.body);
        const errors: ClassValidatorError[] = await validate(dtoInstance, { skipMissingProperties });

        if (errors.length > 0) {
            const formattedErrors = errors.map((error: ClassValidatorError) => ({
                property: error.property,
                value: error.value,
                constraints: error.constraints,
            }));
            return next(new HttpValidationError(formattedErrors));
        }
        
        req.body = dtoInstance;
        next();
    };
}; 
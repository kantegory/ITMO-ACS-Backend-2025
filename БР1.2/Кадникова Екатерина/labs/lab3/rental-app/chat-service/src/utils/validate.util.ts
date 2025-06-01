import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response } from 'express';

export async function validateDto<T extends object>(
    dtoClass: new () => T,
    plain: object,
    req: Request,
    res: Response
): Promise<T | null> {
    const dto = plainToInstance(dtoClass, plain);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
        const errorMessages = errors.flatMap(error =>
            Object.values(error.constraints || {})
        );
        res.status(400).json({
            message: 'Validation failed',
            errors: errorMessages
        });
        return null;
    }

    return dto;
}
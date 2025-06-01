import { plainToInstance } from "class-transformer";
import { validate as classValidate } from "class-validator";
import { Response } from "express";

export async function validateDto<T extends object>(
    dtoClass: new () => T,
    plain: object,
    res: Response
): Promise<T | null> {
    const instance = plainToInstance(dtoClass, plain);
    const errors = await classValidate(instance);

    if (errors.length > 0) {
        res.status(400).json({
            message: "Validation failed",
            errors: errors.map(err => ({
                property: err.property,
                constraints: err.constraints
            }))
        });
        return null;
    }

    return instance;
}
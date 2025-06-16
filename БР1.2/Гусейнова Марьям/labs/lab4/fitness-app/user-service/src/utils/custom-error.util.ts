export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        // Восстановление прототипа в цепочке наследования для TypeScript
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
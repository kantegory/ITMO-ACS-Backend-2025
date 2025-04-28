export class ValidationErrors {
    isError: boolean;
    errors: Record<string, Array<string>> = {};

    addError(field: string, message: string) {
        this.isError = true;
        if (!this.errors[field]) {
            this.errors[field] = new Array();
        }
        this.errors[field].push(message);
    }
}

export class ValidationException extends Error {
    public readonly statusCode = 422;
    constructor(public readonly errors: ValidationErrors) {
        super("Validation failed");
    }
}
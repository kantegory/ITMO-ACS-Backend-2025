export class EntityExistsError<T> extends Error {

    public readonly entityClass: string;

    public readonly entityFieldValue: unknown;

    public readonly entityFieldName: string;

    public readonly status = 400;


    constructor(entityClass: new (...args: any[]) => T, entityFieldValue: unknown, entityFieldName: string) {
        const className = entityClass.name || 'Entity';
        super(`${className} with ${entityFieldName} ${entityFieldValue} already exists`);
        this.name = 'EntityExistsError';
        this.status = 400;
        this.entityClass = className;
        this.entityFieldValue = entityFieldValue;
        this.entityFieldName = entityFieldName;
        Object.setPrototypeOf(this, EntityExistsError.prototype);
    }
}

export default EntityExistsError;

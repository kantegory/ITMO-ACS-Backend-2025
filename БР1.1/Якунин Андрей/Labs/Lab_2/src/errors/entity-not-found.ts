export class EntityNotFoundError<T> extends Error {

    public readonly entityClass: string;

    public readonly entityFieldValue: unknown;

    public readonly entityFieldName: string;

    public readonly status = 404;


    constructor(entityClass: new (...args: any[]) => T, entityFieldValue: unknown, entityFieldName: string) {
        const className = entityClass.name || 'Entity';
        super(`${className} with ${entityFieldName} ${entityFieldValue} not found`);
        this.name = 'EntityNotFoundError';
        this.status = 404;
        this.entityClass = className;
        this.entityFieldValue = entityFieldValue;
        this.entityFieldName = entityFieldName;
        Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    }
}

export default EntityNotFoundError;
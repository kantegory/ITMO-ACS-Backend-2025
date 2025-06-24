"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundError = void 0;
class EntityNotFoundError extends Error {
    constructor(entityClass, entityFieldValue, entityFieldName) {
        const className = entityClass.name || 'Entity';
        super(`${className} with ${entityFieldName} ${entityFieldValue} not found`);
        this.status = 404;
        this.name = 'EntityNotFoundError';
        this.status = 404;
        this.entityClass = className;
        this.entityFieldValue = entityFieldValue;
        this.entityFieldName = entityFieldName;
        Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
exports.default = EntityNotFoundError;
//# sourceMappingURL=entity-not-found.error.js.map
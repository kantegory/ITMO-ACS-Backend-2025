"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityExistsError = void 0;
class EntityExistsError extends Error {
    constructor(entityClass, entityFieldValue, entityFieldName) {
        const className = entityClass.name || 'Entity';
        super(`${className} with ${entityFieldName} ${entityFieldValue} already exists`);
        this.status = 400;
        this.name = 'EntityExistsError';
        this.status = 400;
        this.entityClass = className;
        this.entityFieldValue = entityFieldValue;
        this.entityFieldName = entityFieldName;
        Object.setPrototypeOf(this, EntityExistsError.prototype);
    }
}
exports.EntityExistsError = EntityExistsError;
exports.default = EntityExistsError;
//# sourceMappingURL=entity-exists.error.js.map
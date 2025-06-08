"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const runtime_1 = require("@tsoa/runtime");
function errorHandler(err, req, res, next) {
    console.error('[ERROR]', err.name, '-', err.message);
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    if (err instanceof runtime_1.ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
        return;
    }
    res.status(status).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}
//# sourceMappingURL=error.handler.js.map
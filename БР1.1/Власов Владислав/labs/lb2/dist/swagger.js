"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSwagger = useSwagger;
const storage_1 = require("class-transformer/cjs/storage");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const swaggerUi = __importStar(require("swagger-ui-express"));
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
function useSwagger(app, options) {
    try {
        const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
            classTransformerMetadataStorage: storage_1.defaultMetadataStorage,
            refPointerPrefix: '#/definitions/',
        });
        const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
        const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(storage, options, {
            components: {
                schemas,
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            info: {
                title: 'Boilerplate API documentation',
                description: 'API documentation for boilerplate',
                version: '1.0.0',
            },
        });
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
        return app;
    }
    catch (error) {
        console.error('Ошибка настройки Swagger:', error);
        return app;
    }
}

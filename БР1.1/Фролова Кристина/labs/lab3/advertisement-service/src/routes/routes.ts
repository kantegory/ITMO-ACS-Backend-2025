/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PhotoController } from './../controllers/photo.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryController } from './../controllers/category.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdvertisementController } from './../controllers/advertisement.controller';
import { expressAuthentication } from './../authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "PhotoResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "path": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EntityNotFoundErrorDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdatePhotoRequestDto": {
        "dataType": "refObject",
        "properties": {
            "path": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCategoryRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"value":2},"maxLength":{"value":50}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCategoryRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"value":2},"maxLength":{"value":50}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdvertisementStatus": {
        "dataType": "refEnum",
        "enums": ["active","archived","pending"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RentType": {
        "dataType": "refEnum",
        "enums": ["day","month"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivingType": {
        "dataType": "refEnum",
        "enums": ["country_house","flat","room"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ComfortResponseDto": {
        "dataType": "refObject",
        "properties": {
            "renovation": {"dataType":"string","required":true},
            "devices": {"dataType":"string","required":true},
            "internet": {"dataType":"boolean","required":true},
            "tv": {"dataType":"boolean","required":true},
            "furniture": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FlatResponseDto": {
        "dataType": "refObject",
        "properties": {
            "floor": {"dataType":"double","required":true},
            "kitchenArea": {"dataType":"double","required":true},
            "livingArea": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoomType": {
        "dataType": "refEnum",
        "enums": ["room","bed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoomResponseDto": {
        "dataType": "refObject",
        "properties": {
            "locatedIn": {"dataType":"string","required":true},
            "roomType": {"ref":"RoomType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CountryHouseResponseDto": {
        "dataType": "refObject",
        "properties": {
            "landArea": {"dataType":"double","required":true},
            "communications": {"dataType":"string","required":true},
            "recreations": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivingResponseDto": {
        "dataType": "refObject",
        "properties": {
            "totalFloors": {"dataType":"double","required":true},
            "totalRooms": {"dataType":"double","required":true},
            "area": {"dataType":"double","required":true},
            "meter": {"dataType":"double","required":true},
            "other": {"dataType":"double","required":true},
            "livingType": {"ref":"LivingType","required":true},
            "comfort": {"ref":"ComfortResponseDto","required":true},
            "flat": {"ref":"FlatResponseDto"},
            "room": {"ref":"RoomResponseDto"},
            "countryHouse": {"ref":"CountryHouseResponseDto"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PropertyResponseDto": {
        "dataType": "refObject",
        "properties": {
            "totalArea": {"dataType":"double","required":true},
            "location": {"dataType":"string","required":true},
            "living": {"ref":"LivingResponseDto","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RulesResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "checkInAfter": {"dataType":"datetime","required":true},
            "departureBefore": {"dataType":"datetime","required":true},
            "guestCount": {"dataType":"double","required":true},
            "withChildren": {"dataType":"boolean","required":true},
            "withAnimals": {"dataType":"boolean","required":true},
            "allowedSmoking": {"dataType":"boolean","required":true},
            "allowedParties": {"dataType":"boolean","required":true},
            "report_docs": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdvertisementResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "status": {"ref":"AdvertisementStatus","required":true},
            "rentType": {"ref":"RentType","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "pricePerPeriod": {"dataType":"double","required":true},
            "commission": {"dataType":"double","required":true},
            "deposit": {"dataType":"double","required":true},
            "ownerId": {"dataType":"double","required":true},
            "category": {"ref":"CategoryResponseDto","required":true},
            "property": {"ref":"PropertyResponseDto"},
            "rules": {"ref":"RulesResponseDto"},
            "photos": {"dataType":"array","array":{"dataType":"refObject","ref":"PhotoResponseDto"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateComfortRequestDto": {
        "dataType": "refObject",
        "properties": {
            "renovation": {"dataType":"string","required":true},
            "devices": {"dataType":"string","required":true},
            "internet": {"dataType":"boolean","required":true},
            "tv": {"dataType":"boolean","required":true},
            "furniture": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateFlatRequestDto": {
        "dataType": "refObject",
        "properties": {
            "floor": {"dataType":"integer","required":true,"validators":{"minimum":{"value":1}}},
            "kitchenArea": {"dataType":"double","required":true,"validators":{"minimum":{"value":1}}},
            "livingArea": {"dataType":"double","required":true,"validators":{"minimum":{"value":1}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateRoomRequestDto": {
        "dataType": "refObject",
        "properties": {
            "locatedIn": {"dataType":"string","required":true},
            "roomType": {"ref":"RoomType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCountryHouseRequestDto": {
        "dataType": "refObject",
        "properties": {
            "landArea": {"dataType":"double","required":true,"validators":{"minimum":{"value":1}}},
            "communications": {"dataType":"string","required":true},
            "recreations": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateLivingRequestDto": {
        "dataType": "refObject",
        "properties": {
            "totalFloors": {"dataType":"integer","required":true,"validators":{"minimum":{"value":1}}},
            "totalRooms": {"dataType":"integer","required":true,"validators":{"minimum":{"value":1}}},
            "area": {"dataType":"double","required":true,"validators":{"minimum":{"value":0}}},
            "meter": {"dataType":"double","required":true,"validators":{"minimum":{"value":0}}},
            "other": {"dataType":"double","required":true,"validators":{"minimum":{"value":0}}},
            "livingType": {"ref":"LivingType","required":true},
            "comfort": {"ref":"CreateComfortRequestDto","required":true},
            "flat": {"ref":"CreateFlatRequestDto"},
            "room": {"ref":"CreateRoomRequestDto"},
            "countryHouse": {"ref":"CreateCountryHouseRequestDto"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePropertyRequestDto": {
        "dataType": "refObject",
        "properties": {
            "totalArea": {"dataType":"double","required":true,"validators":{"minimum":{"value":1}}},
            "location": {"dataType":"string","required":true,"validators":{"minLength":{"value":3},"maxLength":{"value":100}}},
            "living": {"ref":"CreateLivingRequestDto","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateRulesRequestDto": {
        "dataType": "refObject",
        "properties": {
            "checkInAfter": {"dataType":"string","required":true},
            "departureBefore": {"dataType":"string","required":true},
            "guestCount": {"dataType":"integer","required":true,"validators":{"minimum":{"value":1}}},
            "withChildren": {"dataType":"boolean","required":true},
            "withAnimals": {"dataType":"boolean","required":true},
            "allowedSmoking": {"dataType":"boolean","required":true},
            "allowedParties": {"dataType":"boolean","required":true},
            "report_docs": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePhotoRequestDto": {
        "dataType": "refObject",
        "properties": {
            "path": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAdvertisementRequestDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true,"validators":{"minLength":{"value":5},"maxLength":{"value":100}}},
            "description": {"dataType":"string","required":true,"validators":{"minLength":{"value":10},"maxLength":{"value":2000}}},
            "categoryId": {"dataType":"integer","required":true,"validators":{"minimum":{"value":1}}},
            "rentType": {"ref":"RentType","required":true},
            "pricePerPeriod": {"dataType":"double","required":true,"validators":{"minimum":{"value":0}}},
            "commission": {"dataType":"double","required":true,"validators":{"minimum":{"value":0}}},
            "deposit": {"dataType":"double","required":true,"validators":{"minimum":{"value":0}}},
            "property": {"ref":"CreatePropertyRequestDto","required":true},
            "rules": {"ref":"CreateRulesRequestDto","required":true},
            "photos": {"dataType":"array","array":{"dataType":"refObject","ref":"CreatePhotoRequestDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateAdvertisementRequestDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","validators":{"minLength":{"value":5},"maxLength":{"value":100}}},
            "description": {"dataType":"string","validators":{"minLength":{"value":10},"maxLength":{"value":2000}}},
            "rentType": {"ref":"RentType"},
            "status": {"ref":"AdvertisementStatus"},
            "pricePerPeriod": {"dataType":"double","validators":{"minimum":{"value":0}}},
            "commission": {"dataType":"double","validators":{"minimum":{"value":0}}},
            "deposit": {"dataType":"double","validators":{"minimum":{"value":0}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsPhotoController_getPhotos: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/photos',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PhotoController)),
            ...(fetchMiddlewares<RequestHandler>(PhotoController.prototype.getPhotos)),

            async function PhotoController_getPhotos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPhotoController_getPhotos, request, response });

                const controller = new PhotoController();

              await templateService.apiHandler({
                methodName: 'getPhotos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPhotoController_getPhotoById: Record<string, TsoaRoute.ParameterSchema> = {
                photoId: {"in":"path","name":"photoId","required":true,"dataType":"double"},
        };
        app.get('/photos/:photoId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PhotoController)),
            ...(fetchMiddlewares<RequestHandler>(PhotoController.prototype.getPhotoById)),

            async function PhotoController_getPhotoById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPhotoController_getPhotoById, request, response });

                const controller = new PhotoController();

              await templateService.apiHandler({
                methodName: 'getPhotoById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPhotoController_updatePhoto: Record<string, TsoaRoute.ParameterSchema> = {
                photoId: {"in":"path","name":"photoId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdatePhotoRequestDto"},
        };
        app.put('/photos/:photoId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PhotoController)),
            ...(fetchMiddlewares<RequestHandler>(PhotoController.prototype.updatePhoto)),

            async function PhotoController_updatePhoto(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPhotoController_updatePhoto, request, response });

                const controller = new PhotoController();

              await templateService.apiHandler({
                methodName: 'updatePhoto',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPhotoController_deletePhoto: Record<string, TsoaRoute.ParameterSchema> = {
                photoId: {"in":"path","name":"photoId","required":true,"dataType":"double"},
        };
        app.delete('/photos/:photoId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PhotoController)),
            ...(fetchMiddlewares<RequestHandler>(PhotoController.prototype.deletePhoto)),

            async function PhotoController_deletePhoto(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPhotoController_deletePhoto, request, response });

                const controller = new PhotoController();

              await templateService.apiHandler({
                methodName: 'deletePhoto',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_getCategories: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/categories',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.getCategories)),

            async function CategoryController_getCategories(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_getCategories, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'getCategories',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_createCategory: Record<string, TsoaRoute.ParameterSchema> = {
                createRequest: {"in":"body","name":"createRequest","required":true,"ref":"CreateCategoryRequestDto"},
        };
        app.post('/categories',
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.createCategory)),

            async function CategoryController_createCategory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_createCategory, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'createCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_getCategoryById: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"path","name":"categoryId","required":true,"dataType":"double"},
        };
        app.get('/categories/:categoryId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.getCategoryById)),

            async function CategoryController_getCategoryById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_getCategoryById, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'getCategoryById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_updateCategory: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"path","name":"categoryId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateCategoryRequestDto"},
        };
        app.put('/categories/:categoryId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.updateCategory)),

            async function CategoryController_updateCategory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_updateCategory, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'updateCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_deleteCategory: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"path","name":"categoryId","required":true,"dataType":"double"},
        };
        app.delete('/categories/:categoryId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.deleteCategory)),

            async function CategoryController_deleteCategory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_deleteCategory, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'deleteCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdvertisementController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/advertisements',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.getAll)),

            async function AdvertisementController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdvertisementController_getAll, request, response });

                const controller = new AdvertisementController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdvertisementController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                advertisementId: {"in":"path","name":"advertisementId","required":true,"dataType":"double"},
        };
        app.get('/advertisements/:advertisementId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.getById)),

            async function AdvertisementController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdvertisementController_getById, request, response });

                const controller = new AdvertisementController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdvertisementController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateAdvertisementRequestDto"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.post('/advertisements',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.create)),

            async function AdvertisementController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdvertisementController_create, request, response });

                const controller = new AdvertisementController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdvertisementController_update: Record<string, TsoaRoute.ParameterSchema> = {
                advertisementId: {"in":"path","name":"advertisementId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateAdvertisementRequestDto"},
        };
        app.put('/advertisements/:advertisementId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.update)),

            async function AdvertisementController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdvertisementController_update, request, response });

                const controller = new AdvertisementController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdvertisementController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                advertisementId: {"in":"path","name":"advertisementId","required":true,"dataType":"double"},
        };
        app.delete('/advertisements/:advertisementId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.delete)),

            async function AdvertisementController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdvertisementController_delete, request, response });

                const controller = new AdvertisementController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdvertisementController_getPhotosByAdvertisement: Record<string, TsoaRoute.ParameterSchema> = {
                advertisementId: {"in":"path","name":"advertisementId","required":true,"dataType":"double"},
        };
        app.get('/advertisements/:advertisementId/photos',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.getPhotosByAdvertisement)),

            async function AdvertisementController_getPhotosByAdvertisement(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdvertisementController_getPhotosByAdvertisement, request, response });

                const controller = new AdvertisementController();

              await templateService.apiHandler({
                methodName: 'getPhotosByAdvertisement',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdvertisementController_createPhoto: Record<string, TsoaRoute.ParameterSchema> = {
                advertisementId: {"in":"path","name":"advertisementId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"CreatePhotoRequestDto"},
        };
        app.post('/advertisements/:advertisementId/photos',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController)),
            ...(fetchMiddlewares<RequestHandler>(AdvertisementController.prototype.createPhoto)),

            async function AdvertisementController_createPhoto(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdvertisementController_createPhoto, request, response });

                const controller = new AdvertisementController();

              await templateService.apiHandler({
                methodName: 'createPhoto',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

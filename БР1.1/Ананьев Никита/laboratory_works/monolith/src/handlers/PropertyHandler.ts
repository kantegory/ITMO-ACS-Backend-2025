import 'reflect-metadata';
import { JsonController, Get, Post, Param, Body,
        NotFoundError as HttpNotFound, HttpCode,  
        InternalServerError, } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi'
import { Inject, Service } from 'typedi';
import { IPropertyService } from '../services/PropertyService';
import { HttpCodes } from './Codes';
import { NotFoundError } from '../errors/NotFoundError';
import { CreatePropertyDto } from '../dtos/PropertyDtos';


@JsonController('/properties')
@Service()
export class PropertyHandler {
    constructor(
        @Inject('IPropertyService')
        private readonly service: IPropertyService
    ){}

    @Get()
    @OpenAPI({
        summary: 'Get properties list',
        description: 'Returns a list of all properties',
        responses: {
            '200': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/ResponsePropertyDto' }
                        }
                    }
                }
            }
        }
    })
    async getPropertyList() {
        return await this.service.findAll();
    }

    @Get('/:id')
    @OpenAPI({
        summary: 'Get property by Id',
        description: 'Returns a single property',
        responses: {
            '200': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ResponsePropertyDto' }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
            '404': {
                description: 'Not Found'
            }
        }
    })
    async getProperty(@Param('id') id: number) {
        try {
            return await this.service.findById(id, ["owner"])
        } catch (error: any) {
            if (error instanceof NotFoundError)
                throw new HttpNotFound("Can't find property with this id")
            console.log(error)
            throw new InternalServerError("Error during get property request")
        }
    }

    @HttpCode(HttpCodes.CREATED)
    @Post()
    @OpenAPI({
        summary: 'Create property',
        description: 'Register new property in the system',
        requestBody: {
            content: {
                'application/json': { schema: {$ref: "#/components/schemas/CreatePropertyDto"}}
            },
        },
        responses: {
            '201': {
                description: 'Created',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ResponsePropertyDto' }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
        }
    })
    async createProperty(@Body() newProperty: CreatePropertyDto) {
        try {
            return await this.service.register(newProperty)
        } catch (error: any) {
            console.log(error)
            throw new InternalServerError("Can't create property")
        }
    }
}

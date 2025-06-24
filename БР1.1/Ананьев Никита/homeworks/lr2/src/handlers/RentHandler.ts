import 'reflect-metadata';
import { JsonController, Get, Post, Param, Body, Req, Res, 
        NotFoundError as HttpNotFound, BadRequestError, HttpCode, ForbiddenError, 
        InternalServerError, 
        Patch} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi'
import { Inject, Service } from 'typedi';
import { FindManyOptions } from 'typeorm';
import { IRentService } from '../services/RentService';
import { HttpCodes } from './Codes';
import { ChangeRentDto, CreateRentDto } from '../dtos/RentDtos';
import { Rent } from '../models/RentModel';

@JsonController('/rents')
@Service()
export class RentHandler {
    constructor (
        @Inject('IRentService')
        private readonly service : IRentService
    ){}

    @Get('/:userId')
    @OpenAPI({
        summary: 'Get rents by userId',
        description: 'Returns rent list of user',
        responses: {
            '200': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/ResponseRentDto' }
                        }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
        }
    })
    async getUserRents(@Param('userId') userId: number) {
        try {
            const options: FindManyOptions<Rent> = {
                where: { renting : { id: Number(userId) } } 
            }
            return await this.service.findAll(options)
        } catch (error: any) {
            // console.log(error)
            throw new InternalServerError("User rents search failed")
        }
    }

    @HttpCode(HttpCodes.CREATED)
    @Post()
    @OpenAPI({
        summary: 'Create rent',
        description: 'Starts new rent',
        requestBody: {
            content: {
                'application/json': { schema: {$ref: "#/components/schemas/CreateRentDto"}}
            },
        },
        responses: {
            '201': {
                description: 'Created',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ResponseRentDto' }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
        }
    })
    async createRent(@Body() newRent: CreateRentDto) {
        try {
            return await this.service.startRent(newRent)
        } catch (error: any) {
            console.log(error)
            throw new InternalServerError("Can't create rent")
        }
    }

    @HttpCode(HttpCodes.ACCEPTED)
    @Patch('/:id')
    @OpenAPI({
        summary: 'Update rent',
        description: 'update existing rent conditions',
        requestBody: {
            content: {
                'application/json': { schema: {$ref: "#/components/schemas/ChangeRentDto"}}
            },
        },
        responses: {
            '202': {
                description: 'Accepted',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ResponseRentDto' }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
            '404': {
                description: 'Not Found'
            },
        }
    })
    async updateRent(@Param('id') id: number, @Body() updRentInfo: ChangeRentDto) {
        updRentInfo.id = id
        try {
            return await this.service.changeRentInfo(updRentInfo)
        } catch (error: any) {
            console.log(error)
            throw new InternalServerError("Can't update rent")
        }
    }
}

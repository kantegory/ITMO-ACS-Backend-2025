import 'reflect-metadata';
import { JsonController, Get, Post, Param, Body, ForbiddenError,
        NotFoundError as HttpNotFound, HttpCode,
        InternalServerError, UseBefore, CurrentUser,
        Patch} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi'
import { Inject, Service } from 'typedi';
import { IRentService } from '../services/RentService';
import { HttpCodes } from './Helpers';
import { ChangeRentDto, CreateRentDto } from '../dtos/RentDtos';
import { AuthMiddleware } from '../middlewares/AuthMiddleware'; 
import { UserDto } from '../dtos/UserDtos';


@JsonController('/rents')
@UseBefore(AuthMiddleware)
@Service()
export class RentController {
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
            return await this.service.findByRentingId(userId)
        } catch (error: any) {
            console.log(error)
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
    async createRent(@CurrentUser() user: UserDto, @Body() newRent: CreateRentDto) {
        if (typeof(user) != undefined && user.id != newRent.rentingId)
            throw new ForbiddenError("renting id must be equal to user id")

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

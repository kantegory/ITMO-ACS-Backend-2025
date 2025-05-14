import 'reflect-metadata';
import { JsonController, Get, Post, Param, Body,
        NotFoundError as HttpNotFound, HttpCode, ForbiddenError, 
        InternalServerError } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi'
import { Inject, Service } from 'typedi';
import { IUserService } from '../services/UserService';
import { HttpCodes } from './Codes';
import { CreateUserDto } from '../dtos/UserDtos';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';
import { NotFoundError } from '../errors/NotFoundError';

@JsonController('/users')
@Service()
export class UserHandler {
    constructor(
        @Inject('IUserService')
        private service : IUserService
    ) { }

    @Get()
    @OpenAPI({
        summary: 'Get users list',
        description: 'Returns a list of all users',
        responses: {
            '200': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/ResponseUserDto' }
                        }
                    }
                }
            }
        }
    })
    async getUserList() {
        return await this.service.findAll();
    }

    @Get('/:id')
    @OpenAPI({
        summary: 'Get user by Id',
        description: 'Returns a single user',
        responses: {
            '200': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ResponseUserDto' }
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
    async getUserById(@Param('id') id: number) {
        try {
            return await this.service.findById(id, ["rents", "properties"])
        } catch (error: any) {
            if (error instanceof NotFoundError)
                throw new HttpNotFound('User not found');
            throw new InternalServerError("Server Error");
        }
    }

    @HttpCode(HttpCodes.CREATED)
    @Post()
    @OpenAPI({
        summary: 'Create user',
        description: 'Registers user in the system',
        requestBody: {
            content: {
                'application/json': { schema: {$ref: "#/components/schemas/CreateUserDto"}}
            },
        },
        responses: {
            '201': {
                description: 'Created',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/ResponseUserDto' }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
            '403': {
                description: 'Forbidden'
            },
        }
    })
    async createUser(@Body() newUser: CreateUserDto) {
        console.log(newUser);
        try {
            const userDto = await this.service.register(newUser)
            console.log(userDto)
            return userDto;
        } catch (error: any) {
            if (error instanceof UserAlreadyExistsError)
                throw new ForbiddenError("Email already taken")
            console.log(error)
            throw new InternalServerError("Server Error")
        }
    }
}

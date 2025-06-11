import 'reflect-metadata';
import { JsonController, Get, Post, Param, Body,
        NotFoundError as HttpNotFound, HttpCode, ForbiddenError, 
        InternalServerError, UseBefore,
        UnauthorizedError} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi'
import { Inject, Service } from 'typedi';
import { IUserService } from '../services/UserService';
import { HttpCodes } from './Codes';
import { CreateUserDto, LoginDto } from '../dtos/UserDtos';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';
import { WrongPasswordError } from '../errors/WrongPasswordError';
import { NotFoundError } from '../errors/NotFoundError';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';


@JsonController('/users')
@Service()
export class UserHandler {
    constructor(
        @Inject('IUserService')
        private service : IUserService
    ) { }

    @Get()
    @UseBefore(AuthMiddleware)
    @OpenAPI({
        summary: 'Get users list',
        description: 'Returns a list of all users',
        security: [{ bearerAuth: [] }],
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
        security: [{ bearerAuth: [] }],
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
    @UseBefore(AuthMiddleware)
    async getUserById(@Param('id') id: number) {
        try {
            return await this.service.findById(id, ["rents", "properties", "sentMessages", "receivedMessages"])
        } catch (error: any) {
            if (error instanceof NotFoundError)
                throw new HttpNotFound('User not found');
            throw new InternalServerError("Server Error");
        }
    }

    @HttpCode(HttpCodes.CREATED)
    @Post("/register")
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
        try {
            return await this.service.register(newUser)
        } catch (error: any) {
            if (error instanceof UserAlreadyExistsError)
                throw new ForbiddenError("Email already taken")
            throw new InternalServerError("Server Error")
        }
    }

    @Post("/login")
    @OpenAPI({
        summary: 'Authorize user',
        description: 'Returns token after auth data verification',
        requestBody: {
            content: {
                'application/json': { schema: {$ref: "#/components/schemas/LoginDto"}}
            },
        },
        responses: {
            '200': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/TokenDto' }
                    }
                }
            },
            '400': {
                description: 'Not Found'
            },
            '401': {
                description: 'Unauthorized'
            },
        }
    })
    async loginUser(@Body() user: LoginDto) {
        try {
            return await this.service.login(user)
        } catch (error: any) {
            if (error instanceof NotFoundError)
                throw new HttpNotFound("Can't find user with provided email")
            if (error instanceof WrongPasswordError)
                throw new UnauthorizedError("Wrong password")
            throw new InternalServerError("Server Error")
        }
    }
}

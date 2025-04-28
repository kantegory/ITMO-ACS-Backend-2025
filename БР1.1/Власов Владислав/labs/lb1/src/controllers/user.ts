import 'reflect-metadata';
import {
    Param,
    Body,
    Get,
    Post,
    Patch,
    Controller,
    Delete,
    HttpCode,
    HttpError,
    UseBefore
} from 'routing-controllers';


import { createUserDto } from '../dtos/createUserDto';
import { IUserService } from '../services/interfaces/IUserService';
import { UserService } from '../services/UserService';
import authMiddleware from '../middlewares/auth';


@Controller('/users')
export class UsersController{

    _service: IUserService

    constructor()
    {
        this._service = new UserService()
    }

    @Post("/create")
    @HttpCode(201)
    async createUser(@Body() user: createUserDto)
    {
        return await this._service.createUser(user)
    }

    @UseBefore(authMiddleware)
    @Get("")
    async getAllUser()
    {
        return await this._service.getAllUser()
    }

    @UseBefore(authMiddleware)
    @Get("/:id")
    async getUser(@Param('id') id: number)
    {
        return await this._service.getUser(id)
    }

    @UseBefore(authMiddleware)
    @Get("/email/:email")
    async getUserByEmail(@Param('email') email: string)
    {
        return await this._service.getUserByEmail(email)
    }

    @UseBefore(authMiddleware)
    @Patch("/update/:id")
    async updateUser(@Param('id') id: number, @Body() user: createUserDto)
    {
        return await this._service.updateUser(id, user)
    }

    @UseBefore(authMiddleware)
    @Delete("/delete/:id")
    @HttpCode(204)
    async deleteUser(@Param('id') id: number)
    {
        await this._service.deleteUser(id)
        return {"message": "Deleted successfully"}
    }

}

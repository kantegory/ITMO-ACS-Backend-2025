import 'reflect-metadata';
import {
    Param,
    Body,
    Get,
    Post,
    Patch,
    Controller,
    Delete
} from 'routing-controllers';

import { LoginDto } from '../dtos/loginDto';
import { IAuthorizationService } from '../services/interfaces/IAuthorizationService';
import { AuthorizationService } from '../services/AuthorizationService';


@Controller('/auth')
export class AuthorizationController{

    _service: IAuthorizationService
    constructor()
    {
        this._service = new AuthorizationService()
    }
    
    @Post("/login")
    async createUser(@Body() user: LoginDto)
    {
        const token = await this._service.login(user)
        return {"token": token}
    }
}   

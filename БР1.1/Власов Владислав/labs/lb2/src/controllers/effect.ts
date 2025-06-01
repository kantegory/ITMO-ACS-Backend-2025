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
    UseBefore,
    Req
} from 'routing-controllers';


import { IEffectService } from '../services/interfaces/IEffectService';
import { EffectService } from '../services/EffectService';
import authMiddleware, { RequestWithUserId } from '../middlewares/auth';
import { CreateEffectDto } from '../dtos/createEffectDto';
import { request } from 'http';


@Controller('/effects')
export class EffectController{

    _service: IEffectService

    constructor()
    {
        this._service = new EffectService()
    }

    @UseBefore(authMiddleware)
    @Post("/create")
    @HttpCode(201)
    async createEffect(@Body() effect: CreateEffectDto)
    {
        return await this._service.post(effect)
    }

    @UseBefore(authMiddleware)
    @Get("/")
    async getAllEffects(@Req() request: RequestWithUserId)
    {
        console.log(request.userId)
        return await this._service.getAll()
    }

    @UseBefore(authMiddleware)
    @Get("/:id")
    async getEffects(@Param('id') id: number)
    {
        return await this._service.get(id)
    }

    @UseBefore(authMiddleware)
    @Get("/:id/conditions")
    async getEffectConditions(@Param('id') id: number)
    {
        return await this._service.getConditions(id)
    }

    @UseBefore(authMiddleware)
    @Patch("/update/:id")
    async updateEffects(@Param('id') id: number, @Body() effect: CreateEffectDto)
    {
        return await this._service.patch(id, effect)
    }

    @UseBefore(authMiddleware)
    @Delete("/delete/:id")
    @HttpCode(204)
    async deleteEffects(@Param('id') id: number)
    {
        await this._service.delete(id)
        return {"message": "Deleted successfully"}
    }

}

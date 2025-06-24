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
    UseBefore
} from 'routing-controllers';


import { IConditionService } from '../services/interfaces/IConditionService';
import { ConditionService } from '../services/ConditionService';
import authMiddleware from '../middlewares/auth';
import { CreateConditionDto } from '../dtos/createConditionDto';


@Controller('/conditions')
export class ConditionController{

    _service: IConditionService

    constructor()
    {
        this._service = new ConditionService()
    }

    @UseBefore(authMiddleware)
    @Post("/create")
    @HttpCode(201)
    async createCondition(@Body() condition: CreateConditionDto)
    {
        return await this._service.post(condition)
    }

    @UseBefore(authMiddleware)
    @Get("/")
    async getAllCondition()
    {
        return await this._service.getAll()
    }

    @UseBefore(authMiddleware)
    @Get("/:id")
    async getCondition(@Param('id') id: number)
    {
        return await this._service.get(id)
    }

    @UseBefore(authMiddleware)
    @Patch("/update/:id")
    async updateCondition(@Param('id') id: number, @Body() condition: CreateConditionDto)
    {
        return await this._service.patch(id, condition)
    }

    @UseBefore(authMiddleware)
    @Delete("/delete/:id")
    @HttpCode(204)
    async deleteCondition(@Param('id') id: number)
    {
        await this._service.delete(id)
        return {"message": "Deleted successfully"}
    }

}

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


import { ISkillService } from '../services/interfaces/ISkillService';
import { SkillService } from '../services/SkillService';
import authMiddleware from '../middlewares/auth';
import { CreateSkillDto } from '../dtos/createSkillDto';


@Controller('/skills')
export class SkillController{

    _service: ISkillService

    constructor()
    {
        this._service = new SkillService()
    }

    @UseBefore(authMiddleware)
    @Post("/create")
    @HttpCode(201)
    async createSkill(@Body() skill: CreateSkillDto)
    {
        return await this._service.post(skill)
    }

    @UseBefore(authMiddleware)
    @Get("/")
    async getAllSkill()
    {
        return await this._service.getAll()
    }

    @UseBefore(authMiddleware)
    @Get("/:id")
    async getSkill(@Param('id') id: number)
    {
        return await this._service.get(id)
    }

    @UseBefore(authMiddleware)
    @Patch("/update/:id")
    async updateSkill(@Param('id') id: number, @Body() skill: CreateSkillDto)
    {
        return await this._service.patch(id, skill)
    }

    @UseBefore(authMiddleware)
    @Delete("/delete/:id")
    @HttpCode(204)
    async deleteSkill(@Param('id') id: number)
    {
        await this._service.delete(id)
        return {"message": "Deleted successfully"}
    }

}

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



import authMiddleware, { RequestWithUserId } from '../middlewares/auth';
import { CreateRaceDto } from '../dtos/createRaceDto';
import { RaceService } from '../services/RaceService';
import { IRaceService } from '../services/interfaces/IRaceService';
import { ChangeEffectsDto } from '../dtos/changeEffectsDto';


@Controller('/races')
export class RaceController{

    _service: IRaceService

    constructor()
    {
        this._service = new RaceService()
    }

    @UseBefore(authMiddleware)
    @Post("/create")
    @HttpCode(201)
    async createRace(@Body() race: CreateRaceDto)
    {
        return await this._service.post(race)
    }

    @UseBefore(authMiddleware)
    @Get("/")
    async getAllRaces(@Req() request: RequestWithUserId)
    {
        console.log(request.userId)
        return await this._service.getAll()
    }

    @UseBefore(authMiddleware)
    @Get("/:id")
    async getRaces(@Param('id') id: number)
    {
        return await this._service.get(id)
    }

    @UseBefore(authMiddleware)
    @Patch("/update/:id")
    async updateRaces(@Param('id') id: number, @Body() race: CreateRaceDto)
    {
        return await this._service.patch(id, race)
    }

    @UseBefore(authMiddleware)
    @Delete("/delete/:id")
    @HttpCode(204)
    async deleteRaces(@Param('id') id: number)
    {
        await this._service.delete(id)
        return {"message": "Deleted successfully"}
    }

    @UseBefore(authMiddleware)
    @Post("/edges/give")
    @HttpCode(201)
    async giveEdges(@Body() edges: ChangeEffectsDto)
    {
        await this._service.giveEdges(edges.entityId, edges.effectsId)
        return {"message": "Added successfully"}
    }

    @UseBefore(authMiddleware)
    @Post("/edges/delete")
    @HttpCode(204)
    async deleteEdgets(@Body() edges: ChangeEffectsDto)
    {
        await this._service.deleteEdges(edges.entityId, edges.effectsId)
        return {"message": "Deleted successfully"}
    }

}

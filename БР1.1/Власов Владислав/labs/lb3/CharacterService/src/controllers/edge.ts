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
import { CreateEdgeDto } from '../dtos/createEdgeDto';
import { EdgeService } from '../services/EdgeService';
import { IEdgeService } from '../services/interfaces/IEdgeService';
import { ChangeEffectsDto } from '../dtos/changeEffectsDto';


@Controller('/edges')
export class EdgeController{

    _service: IEdgeService

    constructor()
    {
        this._service = new EdgeService()
    }

    @UseBefore(authMiddleware)
    @Post("/create")
    @HttpCode(201)
    async createEdge(@Body() edge: CreateEdgeDto)
    {
        return await this._service.post(edge)
    }

    @UseBefore(authMiddleware)
    @Get("/")
    async getAllEdges(@Req() request: RequestWithUserId)
    {
        console.log(request.userId)
        return await this._service.getAll()
    }

    @UseBefore(authMiddleware)
    @Get("/:id")
    async getEdges(@Param('id') id: number)
    {
        return await this._service.get(id)
    }

    @UseBefore(authMiddleware)
    @Patch("/update/:id")
    async updateEdges(@Param('id') id: number, @Body() edge: CreateEdgeDto)
    {
        return await this._service.patch(id, edge)
    }

    @UseBefore(authMiddleware)
    @Delete("/delete/:id")
    @HttpCode(204)
    async deleteEdges(@Param('id') id: number)
    {
        await this._service.delete(id)
        return {"message": "Deleted successfully"}
    }

    @UseBefore(authMiddleware)
    @Post("/effects/give")
    @HttpCode(201)
    async giveEffects(@Body() effects: ChangeEffectsDto)
    {
        await this._service.giveEffects(effects.entityId, effects.effectsId)
        return {"message": "Added successfully"}
    }

    @UseBefore(authMiddleware)
    @Post("/effects/delete")
    @HttpCode(204)
    async deleteEffects(@Body() effects: ChangeEffectsDto)
    {
        await this._service.deleteEffects(effects.entityId, effects.effectsId)
        return {"message": "Deleted successfully"}
    }

}

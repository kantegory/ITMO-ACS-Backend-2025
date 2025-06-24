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
import { CreateItemDto } from '../dtos/createItemDto';
import { ItemService } from '../services/ItemService';
import { IItemService } from '../services/interfaces/IItemService';
import { ChangeEffectsDto } from '../dtos/changeEffectsDto';


@Controller('/items')
export class ItemController{

    _service: IItemService

    constructor()
    {
        this._service = new ItemService()
    }

    @UseBefore(authMiddleware)
    @Post("/create")
    @HttpCode(201)
    async createItem(@Body() item: CreateItemDto)
    {
        return await this._service.post(item)
    }

    @UseBefore(authMiddleware)
    @Get("/")
    async getAllItems(@Req() request: RequestWithUserId)
    {
        console.log(request.userId)
        return await this._service.getAll()
    }

    @UseBefore(authMiddleware)
    @Get("/:id")
    async getItems(@Param('id') id: number)
    {
        return await this._service.get(id)
    }

    @UseBefore(authMiddleware)
    @Patch("/update/:id")
    async updateItems(@Param('id') id: number, @Body() item: CreateItemDto)
    {
        return await this._service.patch(id, item)
    }

    @UseBefore(authMiddleware)
    @Delete("/delete/:id")
    @HttpCode(204)
    async deleteItems(@Param('id') id: number)
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

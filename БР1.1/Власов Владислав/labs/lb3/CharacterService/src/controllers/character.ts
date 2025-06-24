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
import { CreateCharacterDto } from '../dtos/createCharacterDto';
import { CharacterService } from '../services/CharacterService';
import { ICharacterService } from '../services/interfaces/ICharacterService';
import { ChangeEffectsDto } from '../dtos/changeEffectsDto';
import { UpdateCharacterDto } from '../dtos/updateCharacterDto';
import { ItemStatus } from '../models/ItemToCharacter';
import { ChangeItemStatusDto } from '../dtos/changeItemStatusDto';
import { EffectType } from '../models/Effect';


@Controller('/characters')
export class CharacterController{

    _service: ICharacterService

    constructor()
    {
        this._service = new CharacterService()
    }

    @UseBefore(authMiddleware)
    @Post("/create")
    @HttpCode(201)
    async createCharacter(@Req() request: RequestWithUserId, @Body() character: CreateCharacterDto)
    {
        if (!character.playerId)
        {
            character.playerId = request.userId
        }
        return await this._service.createCharacter(character)
    }

    @UseBefore(authMiddleware)
    @Get("/")
    async getMyCharacters(@Req() request: RequestWithUserId)
    {
        return await this._service.getMyCharacters(request.userId)
    }

    @UseBefore(authMiddleware)
    @Get("/other")
    async getOtherCharacter(@Req() request: RequestWithUserId)
    {
        return await this._service.getOtherCharacters(request.userId)
    }

    @UseBefore(authMiddleware)
    @Get("/:id")
    async getCharacter(@Req() request: RequestWithUserId, @Param('id') id: number)
    {
        return await this._service.getCharacter(request.userId, id)
    }

    @UseBefore(authMiddleware)
    @Patch("/update/:id")
    async updateCharacter(@Req() request: RequestWithUserId, @Param('id') id: number, @Body() character: UpdateCharacterDto)
    {
        return await this._service.updateCharacter(request.userId, id, character)
    }

    @UseBefore(authMiddleware)
    @Delete("/delete/:id")
    @HttpCode(204)
    async deleteCharacter(@Req() request: RequestWithUserId, @Param('id') id: number)
    {
        await this._service.deleteCharacter(request.userId, id)
        return {"message": "Deleted successfully"}
    }
    // Тут закончен swagger
    @UseBefore(authMiddleware)
    @Patch("/:charId/race/:raceId")
    async setRaceToCharacter(@Req() request: RequestWithUserId, @Param('charId') charId: number, @Param('raceId') raceId: number)
    {
        await this._service.setRace(request.userId, charId, raceId)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Patch("/:charId/visibility/:status")
    async setVisibilityToCharacter(@Req() request: RequestWithUserId, @Param('charId') charId: number, @Param('status') status: boolean)
    {
        await this._service.setVisibleStatus(request.userId, charId, status)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Post("/:charId/items")
    async giveItems(@Req() request: RequestWithUserId, @Param('charId') charId: number, @Body() items: number[])
    {
        await this._service.giveItems(request.userId, charId, items)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Patch("/:charId/items/:itemId/status")
    async changeItemStatus(@Req() request: RequestWithUserId, @Param('charId') charId: number, @Param('itemId') itemId: number, @Body() status: ChangeItemStatusDto)
    {
        await this._service.changeItemStatus(request.userId, charId, itemId, status.status)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Delete("/items/delete")
    @HttpCode(204)
    async deleteItems(@Req() request: RequestWithUserId, @Body() items: number[])
    {
        await this._service.deleteItems(request.userId, items)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Post("/:charId/effects")
    async giveEffects(@Req() request: RequestWithUserId, @Param('charId') charId: number, @Body() effects: number[])
    {
        await this._service.giveEffects(request.userId, charId, effects)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Delete("/effects/delete")
    @HttpCode(204)
    async deleteEffects(@Req() request: RequestWithUserId, @Body() effects: number[])
    {
        await this._service.deleteEffects(request.userId, effects)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Post("/:charId/skills")
    async giveSkills(@Req() request: RequestWithUserId, @Param('charId') charId: number, @Body() skills: number[])
    {
        await this._service.giveSkills(request.userId, charId, skills)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Patch("/skills/:skillId/level/:level")
    async setSkillLevel(
        @Req() request: RequestWithUserId,
        @Param('skillId') skillId: number,
        @Param('level') level: number
    )
    {
        await this._service.upSkill(request.userId, skillId, level)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Delete("/skills/delete")
    @HttpCode(204)
    async deleteSkills(@Req() request: RequestWithUserId, @Body() skills: number[])
    {
        await this._service.deleteSkills(request.userId, skills)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Post("/:charId/edges")
    async giveEdges(@Req() request: RequestWithUserId, @Param('charId') charId: number, @Body() edges: number[])
    {
        await this._service.giveEdges(request.userId, charId, edges)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Delete("/:charId/edges/delete")
    @HttpCode(204)
    async deleteEdges(@Req() request: RequestWithUserId, @Param('charId') charId: number, @Body() edges: number[])
    {
        await this._service.deleteEdges(request.userId, charId, edges)
        return {"message": "Successfully"}
    }

    @UseBefore(authMiddleware)
    @Get("/:charId/effects/attack")
    async getAttackEffect(@Req() request: RequestWithUserId, @Param('charId') charId: number)
    {
        return await this._service.getCharEffects(request.userId, charId, EffectType.Attact)
    }

    @UseBefore(authMiddleware)
    @Get("/:charId/effects/defence")
    async getPassiveEffect(@Req() request: RequestWithUserId, @Param('charId') charId: number)
    {
        return await this._service.getCharEffects(request.userId, charId, EffectType.Defence)
    }

    @UseBefore(authMiddleware)
    @Get("/:charId/effects/universal")
    async getUniversalEffect(@Req() request: RequestWithUserId, @Param('charId') charId: number)
    {
        return await this._service.getCharEffects(request.userId, charId, EffectType.Universal)
    }
}

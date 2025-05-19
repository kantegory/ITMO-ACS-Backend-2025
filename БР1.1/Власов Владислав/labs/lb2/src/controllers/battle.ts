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
import { IBattleService } from '../services/interfaces/IBattleService';
import { BattleService } from '../services/BattleService';


@Controller('/battle')
export class BattleController{

    _service: IBattleService

    constructor()
    {
        this._service = new BattleService()
    }

    @UseBefore(authMiddleware)
    @Patch("/:attackCharId/attack/:defenceCharId/")
    async createEdge(
        @Req() request: RequestWithUserId,
        @Param('attackCharId') attackCharId: number,
        @Param('defenceCharId') defenceCharId: number,
    )
    {
        await this._service.Attack(request.userId, attackCharId, defenceCharId)
        return { "message": "attack Ok" }
    }
}

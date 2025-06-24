import 'reflect-metadata';
import {
    Param,
    Patch,
    Controller,
    UseBefore,
    Req
} from 'routing-controllers';



import authMiddleware, { RequestWithUserId } from '../middlewares/auth';
import { IBattleService } from '../services/interfaces/IBattleService';
import { BattleService } from '../services/BattleService';
import { OpenAPI } from 'routing-controllers-openapi';


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

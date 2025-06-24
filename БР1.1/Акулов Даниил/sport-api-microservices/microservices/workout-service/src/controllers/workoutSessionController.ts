import {dataSource} from "../config/dataSource";
import {Request, RequestHandler, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {WorkoutSession} from "../models/WorkoutSession";
import {Body, Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";
import {CreateWorkoutSessionDto, UpdateWorkoutSessionDto} from "../dto/workoutSessionDto";

const workoutSessionRepo = dataSource.getRepository(WorkoutSession);

@JsonController('/workout-session')
export class WorkoutSessionController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const sessions = await workoutSessionRepo.find();
        return res.json({sessions});
    }


    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const session = await workoutSessionRepo.findOne({ where: { id: +id } });
        if (!session) {
            throw ApiError.badRequest(errorMessages.exerciseTypeNotFound)
        }
        return res.json({session});
    }

    @OpenAPI({})
    @Post('/')
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: CreateWorkoutSessionDto
    ) {
        const newSession = workoutSessionRepo.create(body);
        await workoutSessionRepo.save(newSession);
        return res.json({session: newSession});
    }

    @OpenAPI({})
    @Put('/:id')
    async update(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: UpdateWorkoutSessionDto
    ) {
        const { id } = req.params;
        const session = await workoutSessionRepo.findOne({ where: { id: +id } });
        if (!session) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        const updated = workoutSessionRepo.merge(session, body);
        await workoutSessionRepo.save(updated);
        return res.json({session: updated});
    }

    @OpenAPI({})
    @Delete('/:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const session = await workoutSessionRepo.findOne({ where: { id: +id } });
        if (!session) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await workoutSessionRepo.remove(session);
        return res.json({ message: 'Deleted successfully' });
    }
}

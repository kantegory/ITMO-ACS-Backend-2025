import {dataSource} from "../config/dataSource";
import {Request, RequestHandler, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {SessionExercise} from "../models/SessionExercise";
import {Body, Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";
import {CreateExerciseTypeDto} from "../dto/exerciseTypeDto";
import {UpdateSessionExerciseDto} from "../dto/sessionExerciseDto";

const sessionExerciseRepo = dataSource.getRepository(SessionExercise);

@JsonController('/session-exercise')
export class SessionExerciseController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const exercises = await sessionExerciseRepo.find();
        return res.json({exercises});
    }

    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const exercise = await sessionExerciseRepo.findOne({ where: { id: Number(id) } });
        if (!exercise) {
            throw ApiError.badRequest(errorMessages.postNotFound)
        }
        return res.json({exercise});
    }

    @OpenAPI({})
    @Post('/')
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: CreateExerciseTypeDto
    ) {
        const newExercise = sessionExerciseRepo.create(body);
        await sessionExerciseRepo.save(newExercise);
        return res.json({exercise: newExercise});
    }

    @OpenAPI({})
    @Put('/:id')
    async update(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: UpdateSessionExerciseDto
    ) {
        const { id } = req.params;
        const exercise = await sessionExerciseRepo.findOne({ where: { id: Number(id) } });
        if (!exercise) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        const updated = sessionExerciseRepo.merge(exercise, body)
        await sessionExerciseRepo.save(updated);
        return res.json({exercise: updated});
    }

    @OpenAPI({})
    @Delete('/:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const exercise = await sessionExerciseRepo.findOne({ where: { id: Number(id) } });
        if (!exercise) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await sessionExerciseRepo.remove(exercise);
        return res.json({ message: 'Deleted successfully' });
    }
}

export default new SessionExerciseController();

import {dataSource} from "../config/dataSource";
import {Request, RequestHandler, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {ExerciseType} from "../models/ExerciseType";
import {OpenAPI} from "routing-controllers-openapi";
import {Body, Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {CreateExerciseTypeDto, UpdateExerciseTypeDto} from "../dto/exerciseTypeDto";

const exerciseTypeRepo = dataSource.getRepository(ExerciseType);

@JsonController('/exercise-type')
export class ExerciseTypeController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const exerciseTypes = await exerciseTypeRepo.find();
        return res.json({exerciseTypes});
    }

    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const exerciseType = await exerciseTypeRepo.findOne({ where: { id: Number(id) } });
        if (!exerciseType) {
            throw ApiError.badRequest(errorMessages.exerciseTypeNotFound)
        }
        return res.json({exerciseType});
    }

    @OpenAPI({})
    @Post('/')
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: CreateExerciseTypeDto
    ) {
        const newExerciseType = exerciseTypeRepo.create(body);
        await exerciseTypeRepo.save(newExerciseType);
        return res.json({exerciseType: newExerciseType});
    }

    @OpenAPI({})
    @Put('/:id')
    async update(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: UpdateExerciseTypeDto
    ) {
        const { id } = req.params;
        const exerciseType = await exerciseTypeRepo.findOne({ where: { id: Number(id) } });
        if (!exerciseType) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        const updated = exerciseTypeRepo.merge(exerciseType, body);
        await exerciseTypeRepo.save(updated);
        return res.json({exerciseType: updated});
    }

    @OpenAPI({})
    @Delete('/:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const exerciseType = await exerciseTypeRepo.findOne({ where: { id: Number(id) } });
        if (!exerciseType) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await exerciseTypeRepo.remove(exerciseType);
        return res.json({ message: 'Deleted successfully' });
    }
}


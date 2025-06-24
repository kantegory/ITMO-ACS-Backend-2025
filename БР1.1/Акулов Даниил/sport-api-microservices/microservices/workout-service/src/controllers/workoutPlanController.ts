import {dataSource} from "../config/dataSource";
import {Request, RequestHandler, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {WorkoutPlan} from "../models/WorkoutPlan";
import {Authorized, Body, Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";
import {CreateWorkoutPlanDto, CreateWorkoutPlanUserLinkDto, UpdateWorkoutPlanDto} from "../dto/workoutPlanDto";
import {WorkoutPlanUserLink} from "../models/WorkoutPlanUserLink";
import {listenToQueue} from "../rabbitmq";

const workoutPlanRepo = dataSource.getRepository(WorkoutPlan);
const workoutPlanUserLinkRepo = dataSource.getRepository(WorkoutPlanUserLink);

const createNewWorkoutPlan = async (userId: number) => {
    const newWorkoutPlan = workoutPlanRepo.create({title: "My first Workout", type: 'cardio', level: 5, userId});
    await workoutPlanRepo.save(newWorkoutPlan);
}

listenToQueue('create-workout-plan', data => createNewWorkoutPlan(data.userId));

@JsonController('/workout-plan')
export class WorkoutPlanController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const workoutPlans = await workoutPlanRepo.find();
        return res.json({workoutPlans});
    }

    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const workoutPlan = await workoutPlanRepo.findOne({ where: { id: Number(id) } });
        if (!workoutPlan) {
            throw ApiError.badRequest(errorMessages.exerciseTypeNotFound)
        }
        return res.json({workoutPlan});
    }

    @OpenAPI({})
    @Post('/')
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: CreateWorkoutPlanDto
    ) {
        const newWorkoutPlan = workoutPlanRepo.create(body);
        await workoutPlanRepo.save(newWorkoutPlan);
        return res.json({workoutPlan: newWorkoutPlan});
    }

    @OpenAPI({})
    @Put('/:id')
    async update(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: UpdateWorkoutPlanDto
    ) {
        const { id } = req.params;
        const workoutPlan = await workoutPlanRepo.findOne({ where: { id: Number(id) } });
        if (!workoutPlan) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        const updatedWorkoutPlan = workoutPlanRepo.merge(workoutPlan, body);
        await workoutPlanRepo.save(updatedWorkoutPlan);
        return res.json({workoutPlan: updatedWorkoutPlan});
    }

    @OpenAPI({})
    @Delete('/:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const workoutPlan = await workoutPlanRepo.findOne({ where: { id: Number(id) } });
        if (!workoutPlan) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await workoutPlanRepo.remove(workoutPlan);
        return res.json({ message: 'Deleted successfully' });
    }

    @OpenAPI({})
    @Get('/get-workout-plans/:userId')
    async getWorkoutPlans(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const userId = parseInt(req.params.userId);
        const links = await workoutPlanUserLinkRepo.find({ where: { userId }, relations: ['workoutPlan'] });
        const workoutPlans = links.map(link => link.workoutPlan);
        return res.json({workoutPlans});
    }

    @OpenAPI({security: [{ bearerAuth: [] }]})
    @Post('/add-workout-plans')
    @Authorized()
    async addWorkoutPlan(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: CreateWorkoutPlanUserLinkDto,
    ) {
        if(!req.user) throw ApiError.forbidden()
        const link = workoutPlanUserLinkRepo.create({userId: req.user.id, ...body});
        const savedLink = await workoutPlanUserLinkRepo.save(link);
        return res.json({savedLink});
    }

    @OpenAPI({security: [{ bearerAuth: [] }]})
    @Delete('/remove-workout-plans/:workoutPlanId')
    @Authorized()
    async removeWorkoutPlan(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if(!req.user) throw ApiError.forbidden()
        const workoutPlanId = parseInt(req.params.workoutPlanId);
        const workoutPlanUserLink = await workoutPlanUserLinkRepo.find({where: {workoutPlanId, userId: req.user.id}});
        if (!workoutPlanUserLink) {
            throw ApiError.badRequest(errorMessages.workoutPlanNotFound)
        }
        return res.json({ message: 'Deleted successfully' });
    }
}
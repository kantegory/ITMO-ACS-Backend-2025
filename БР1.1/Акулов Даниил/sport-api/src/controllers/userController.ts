import {dataSource} from "../config/dataSource";
import {User} from "../models/User";
import {Request, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {WorkoutPlanUserLink} from "../models/WorkoutPlanUserLink";
import {Authorized, Body, Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";
import {UpdateUserDto} from "../dto/userDto";
import {CreateWorkoutPlanUserLinkDto} from "../dto/workoutPlanDto";

const userRepo = dataSource.getRepository(User);
const workoutPlanUserLinkRepo = dataSource.getRepository(WorkoutPlanUserLink);

@JsonController('/user')
export class UserController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const users = await userRepo.find();
        return res.json({users});
    }

    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const user = await userRepo.findOne({ where: { id: +req.params.id } });
        if (!user) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        return res.json({user});
    }

    @OpenAPI({security: [{ bearerAuth: [] }]})
    @Put('/')
    @Authorized()
    async update(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: UpdateUserDto,
    ) {
        if(!req.user) throw ApiError.forbidden()
        const user = await userRepo.findOne({ where: { id: req.user.id } });
        if (!user) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        const updated = userRepo.merge(user, body);
        await userRepo.save(updated);
        return res.json({user: updated});
    }

    @OpenAPI({security: [{ bearerAuth: [] }]})
    @Delete('/')
    @Authorized()
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if(!req.user) throw ApiError.forbidden()
        const user = await userRepo.findOne({ where: { id: +req.user.id } });
        if (!user) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await userRepo.remove(user);
        return res.json({ message: 'User deleted successfully' });
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


import {dataSource} from "../config/dataSource";
import {User} from "../models/User";
import {Request, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {Authorized, Body, Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";
import {UpdateUserDto} from "../dto/userDto";
import axios from "axios";
import {SETTINGS} from "../config/settings";
import {CreateWorkoutPlanUserLinkDto} from "../dto/workoutPlanDto";

const userRepo = dataSource.getRepository(User);

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
        let workoutPlans = []
        try{
            const response = await axios.get(
                `http://workout-service:${SETTINGS.API_WORKOUT_PORT}/api/workout-plan/get-workout-plans/${userId}`)
            workoutPlans = response.data.workoutPlans;
        } catch(error) {
            console.log("Axios error: ", error)
        }
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
        let savedLink = null
        try{
            const response = await axios.post(
                `http://workout-service:${SETTINGS.API_WORKOUT_PORT}/api/workout-plan/add-workout-plans`,
                body,
                {headers: {'Authorization': req.headers.authorization}})
            savedLink = response.data.savedLink;
        } catch(error) {
            console.log("Axios error: ", error)
        }
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
        await axios.delete(
            `http://workout-service:${SETTINGS.API_WORKOUT_PORT}/api/workout-plan/remove-workout-plans/${req.params.workoutPlanId}`,
            {headers: {'Authorization': req.headers.authorization}})
        return res.json({ message: 'Deleted successfully' });
    }
}


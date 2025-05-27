import {dataSource} from "../config/dataSource";
import {User} from "../models/User";
import {RequestHandler} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {WorkoutPlanUserLink} from "../models/WorkoutPlanUserLink";

const userRepo = dataSource.getRepository(User);
const workoutPlanUserLinkRepo = dataSource.getRepository(WorkoutPlanUserLink);

class UserController {
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const users = await userRepo.find();
            return res.json({users});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    getOne: RequestHandler = async (req, res, next) => {
        try {
            const user = await userRepo.findOne({ where: { id: +req.params.id } });
            if (!user) {
                return next(ApiError.badRequest(errorMessages.userNotFound));
            }
            return res.json({user});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    update: RequestHandler = async (req, res, next) => {
        try {
            const user = await userRepo.findOne({ where: { id: +req.params.id } });
            if (!user) {
                return next(ApiError.badRequest(errorMessages.userNotFound));
            }
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.avatarUrl = req.body.avatarUrl || user.avatarUrl;
            await userRepo.save(user);
            return res.json({user});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    delete: RequestHandler = async (req, res, next) => {
        try {
            const user = await userRepo.findOne({ where: { id: +req.params.id } });
            if (!user) {
                return next(ApiError.badRequest(errorMessages.userNotFound));
            }
            await userRepo.remove(user);
            return res.json({ message: 'User deleted successfully' });
        } catch (e) {
            next(ApiError.internal());
        }
    }

    getWorkoutPlans: RequestHandler = async (req, res, next) => {
        try {
            const userId = parseInt(req.params.userId);
            const links = await workoutPlanUserLinkRepo.find({ where: { userId }, relations: ['workoutPlan'] });
            const workoutPlans = links.map(link => link.workoutPlan);
            return res.json({workoutPlans});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    addWorkoutPlan: RequestHandler = async (req, res, next) => {
        if(!req.user) return next(ApiError.forbidden());
        try {
            const { userId, workoutPlanId, planedAt } = req.body;
            const link = workoutPlanUserLinkRepo.create({userId, workoutPlanId, planedAt});
            link.userId = userId;
            link.workoutPlanId = workoutPlanId;
            link.planedAt = new Date(planedAt);
            const savedLink = await workoutPlanUserLinkRepo.save(link);
            return res.json({savedLink});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    removeWorkoutPlan: RequestHandler = async (req, res, next) => {
        if(!req.user) return next(ApiError.forbidden());
        try {
            const workoutPlanId = parseInt(req.params.workoutPlanId);
            const workoutPlanUserLink = await workoutPlanUserLinkRepo.find({where: {workoutPlanId, userId: +req.user.id}});
            if (!workoutPlanUserLink) {
                return next(ApiError.badRequest(errorMessages.workoutPlanNotFound));
            }
            return res.json({ message: 'Deleted successfully' });
        } catch (e) {
            next(ApiError.internal());
        }
    }
}

export default new UserController();

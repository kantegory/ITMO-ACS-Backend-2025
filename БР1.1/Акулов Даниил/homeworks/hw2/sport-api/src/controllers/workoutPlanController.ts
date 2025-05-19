import {dataSource} from "../config/dataSource";
import {RequestHandler} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {WorkoutPlan} from "../models/WorkoutPlan";

const workoutPlanRepo = dataSource.getRepository(WorkoutPlan);

class WorkoutPlanController {
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const workoutPlans = await workoutPlanRepo.find();
            return res.json({workoutPlans});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    getOne: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const workoutPlan = await workoutPlanRepo.findOne({ where: { id: Number(id) } });
            if (!workoutPlan) {
                return next(ApiError.badRequest(errorMessages.workoutPlanNotFound));
            }
            return res.json(workoutPlan);
        } catch (e) {
            next(ApiError.internal());
        }
    }

    create: RequestHandler = async (req, res, next) => {
        try {
            const { title, description, content, type, level, duration, videoUrl, userId } = req.body;
            const newWorkoutPlan = workoutPlanRepo.create({ title, description, content, type, level, duration, videoUrl, userId });
            await workoutPlanRepo.save(newWorkoutPlan);
            return res.json({workoutPlan: newWorkoutPlan});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    update: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const workoutPlan = await workoutPlanRepo.findOne({ where: { id: Number(id) } });
            if (!workoutPlan) {
                return next(ApiError.badRequest(errorMessages.workoutPlanNotFound));
            }
            const updatedWorkoutPlan = workoutPlanRepo.merge(workoutPlan, req.body);
            await workoutPlanRepo.save(updatedWorkoutPlan);
            return res.json({workoutPlan: updatedWorkoutPlan});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    delete: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const workoutPlan = await workoutPlanRepo.findOne({ where: { id: Number(id) } });
            if (!workoutPlan) {
                return next(ApiError.badRequest(errorMessages.workoutPlanNotFound));
            }
            await workoutPlanRepo.remove(workoutPlan);
            return res.json({ message: 'Deleted successfully' });
        } catch (e) {
            next(ApiError.internal());
        }
    }
}

export default new WorkoutPlanController();
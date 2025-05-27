import {dataSource} from "../config/dataSource";
import {RequestHandler} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {WorkoutSession} from "../models/WorkoutSession";

const workoutSessionRepo = dataSource.getRepository(WorkoutSession);

class WorkoutSessionController {
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const sessions = await workoutSessionRepo.find();
            return res.json({sessions});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    getOne: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        try {
            const session = await workoutSessionRepo.findOne({ where: { id: +id } });
            if (!session) {
                return next(ApiError.badRequest(errorMessages.sessionNotFound));
            }
            return res.json({session});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    create: RequestHandler = async (req, res, next) => {
        const { title, description, type, startedAt, endedAt, userId } = req.body;
        try {
            const newSession = workoutSessionRepo.create({ title, description, type, startedAt, endedAt, userId });
            await workoutSessionRepo.save(newSession);
            return res.json({session: newSession});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    update: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        const { title, description, type, startedAt, endedAt, userId } = req.body;
        try {
            const session = await workoutSessionRepo.findOne({ where: { id: +id } });
            if (!session) {
                return next(ApiError.badRequest(errorMessages.sessionNotFound));
            }
            workoutSessionRepo.merge(session, { title, description, type, startedAt, endedAt, userId });
            await workoutSessionRepo.save(session);
            return res.json({session});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    delete: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        try {
            const session = await workoutSessionRepo.findOne({ where: { id: +id } });
            if (!session) {
                return next(ApiError.badRequest(errorMessages.sessionNotFound));
            }
            await workoutSessionRepo.remove(session);
            return res.json({ message: 'Deleted successfully' });
        } catch (e) {
            next(ApiError.internal());
        }
    }
}

export default new WorkoutSessionController();

import {dataSource} from "../config/dataSource";
import {RequestHandler} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {SessionExercise} from "../models/SessionExercise";

const sessionExerciseRepo = dataSource.getRepository(SessionExercise);

class SessionExerciseController {
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const exercises = await sessionExerciseRepo.find();
            return res.json({exercises});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    getOne: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        try {
            const exercise = await sessionExerciseRepo.findOne({ where: { id: Number(id) } });
            if (!exercise) {
                return next(ApiError.badRequest(errorMessages.sessionExerciseNotFound));
            }
            return res.json({exercise});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    create: RequestHandler = async (req, res, next) => {
        const { userId, sessionId, exerciseTypeId, weight, count, time, description } = req.body;
        try {
            const newExercise = sessionExerciseRepo.create({ userId, sessionId, exerciseTypeId, weight, count, time, description });
            await sessionExerciseRepo.save(newExercise);
            return res.json({exercise: newExercise});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    update: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        const { userId, sessionId, exerciseTypeId, weight, count, time, description } = req.body;
        try {
            const exercise = await sessionExerciseRepo.findOne({ where: { id: Number(id) } });
            if (!exercise) {
                return next(ApiError.badRequest(errorMessages.sessionExerciseNotFound));
            }
            exercise.userId = userId;
            exercise.sessionId = sessionId;
            exercise.exerciseTypeId = exerciseTypeId;
            exercise.weight = weight;
            exercise.count = count;
            exercise.time = time;
            exercise.description = description;

            await sessionExerciseRepo.save(exercise);
            return res.json({exercise});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    delete: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        try {
            const exercise = await sessionExerciseRepo.findOne({ where: { id: Number(id) } });
            if (!exercise) {
                return next(ApiError.badRequest(errorMessages.sessionExerciseNotFound));
            }
            await sessionExerciseRepo.remove(exercise);
            return res.json({ message: 'Deleted successfully' });
        } catch (e) {
            next(ApiError.internal());
        }
    }
}

export default new SessionExerciseController();

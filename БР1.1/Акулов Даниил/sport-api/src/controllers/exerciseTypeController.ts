import {dataSource} from "../config/dataSource";
import {RequestHandler} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {ExerciseType} from "../models/ExerciseType";

const exerciseTypeRepo = dataSource.getRepository(ExerciseType);

class ExerciseTypeController {
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const exerciseTypes = await exerciseTypeRepo.find();
            return res.json({exerciseTypes});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    getOne: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        try {
            const exerciseType = await exerciseTypeRepo.findOne({ where: { id: Number(id) } });
            if (!exerciseType) {
                return next(ApiError.badRequest(errorMessages.exerciseTypeNotFound));
            }
            return res.json({exerciseType});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    create: RequestHandler = async (req, res, next) => {
        const { name, description, muscleGroup } = req.body;
        try {
            const newExerciseType = exerciseTypeRepo.create({ name, description, muscleGroup });
            await exerciseTypeRepo.save(newExerciseType);
            return res.json({exerciseType: newExerciseType});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    update: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        const { name, description, muscleGroup } = req.body;
        try {
            const exerciseType = await exerciseTypeRepo.findOne({ where: { id: Number(id) } });
            if (!exerciseType) {
                return next(ApiError.badRequest(errorMessages.exerciseTypeNotFound));
            }
            exerciseType.name = name;
            exerciseType.description = description;
            exerciseType.muscleGroup = muscleGroup;
            await exerciseTypeRepo.save(exerciseType);
            return res.json({exerciseType});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    delete: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        try {
            const exerciseType = await exerciseTypeRepo.findOne({ where: { id: Number(id) } });
            if (!exerciseType) {
                return next(ApiError.badRequest(errorMessages.exerciseTypeNotFound));
            }
            await exerciseTypeRepo.remove(exerciseType);
            return res.json({ message: 'Deleted successfully' });
        } catch (e) {
            next(ApiError.internal());
        }
    }
}

export default new ExerciseTypeController();

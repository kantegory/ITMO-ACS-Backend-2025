import {dataSource} from "../config/dataSource";
import {User} from "../models/User";
import {RequestHandler} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";

const userRepo = dataSource.getRepository(User);

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
}

export default new UserController();

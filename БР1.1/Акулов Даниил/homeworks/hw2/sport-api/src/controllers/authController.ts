import {User} from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {RequestHandler} from "express";
import {dataSource} from "../config/dataSource";
import {SETTINGS} from "../config/settings";

const userRepo = dataSource.getRepository(User);

const generateAccessToken = (id: number, email: string) => {
    const payload = { id, email }
    return jwt.sign(payload, SETTINGS.JWT_SECRET_KEY, {expiresIn: "30d"} )
}

class AuthController {
    registration: RequestHandler = async (req, res, next) => {
        try {
            const {email, password, name} = req.body
            const candidate = await userRepo.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest(errorMessages.emailIsTaken))
            }
            const hashPassword = await bcrypt.hash(password, 6)
            const userEntity = userRepo.create({email, password: hashPassword, name});
            const user = await userRepo.save(userEntity);
            const token = generateAccessToken(user.id, email)
            return res.json({token, user})
        }  catch (e) {
            next(ApiError.internal())
        }
    }

    login: RequestHandler = async (req, res, next) => {
        try {
            const {email, password} = req.body
            const user = await userRepo.findOne({where: {email}})
            if (!user) {
                return next(ApiError.badRequest(errorMessages.userNotFound))
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return next(ApiError.badRequest(errorMessages.wrongPassword))
            }
            const token = generateAccessToken(user.id, user.email)
            return res.json({token, user})
        }  catch (e) {
            next(ApiError.internal())
        }
    }

    check: RequestHandler = async (req, res, next) => {
        if(!req.user) return next(ApiError.forbidden());
        try {
            const token = generateAccessToken(req.user.id, req.user.email)
            return res.json({token})
        }  catch (e) {
            next(ApiError.internal())
        }
    }

    usersHandler: RequestHandler = async (req, res, next) => {
        try {
            const users = await userRepo.find()
            res.json(users)
        } catch (e) {
            next(ApiError.internal())
        }
    }
}

export default new AuthController();
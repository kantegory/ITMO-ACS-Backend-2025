import {User} from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {dataSource} from "../config/dataSource";
import {SETTINGS} from "../config/settings";
import {Authorized, Body, Get, JsonController, Post, Req, Res, UseBefore} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";
import {Request, Response, NextFunction} from 'express';
import {LoginDto, RegistrationDto} from "../dto/userDto";
import {sendToQueue} from "../rabbitmq";

const userRepo = dataSource.getRepository(User);

const generateAccessToken = (id: number, email: string) => {
    const payload = { id, email }
    return jwt.sign(payload, SETTINGS.JWT_SECRET_KEY, {expiresIn: "30d"} )
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyQGEuY29tIiwiaWF0IjoxNzQ4OTMxODI4LCJleHAiOjE3NTE1MjM4Mjh9.dDZMgeYRBD71hGXkbUyHAELmCSb51x666JTOgaD2MCI

@JsonController('/auth')
export class AuthController {
    @OpenAPI({})
    @Post('/registration')
    async registration(
        @Body() body: RegistrationDto,
        @Res() res: Response,
    ) {
        const {email, password, name} = body
        const candidate = await userRepo.findOne({where: {email}})
        if (candidate) {
            throw ApiError.badRequest(errorMessages.emailIsTaken)
        }
        const hashPassword = await bcrypt.hash(password, 6)
        const userEntity = userRepo.create({email, password: hashPassword, name});
        const user = await userRepo.save(userEntity);
        const token = generateAccessToken(user.id, email)
        await sendToQueue('create-workout-plan', {userId: user.id})
        return res.json({token, user})
    }

    @OpenAPI({})
    @Post('/login')
    async login(
        @Body() body: LoginDto,
        @Res() res: Response,
    ) {
        const {email, password} = body
        const user = await userRepo.findOne({where: {email}})
        if (!user) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            throw ApiError.badRequest(errorMessages.wrongPassword)
        }
        const token = generateAccessToken(user.id, user.email)
        return res.json({token, user})
    }

    @OpenAPI({security: [{ bearerAuth: [] }]})
    @Get('/check')
    @Authorized()
    async check(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if(!req.user) throw ApiError.forbidden()
        const token = generateAccessToken(req.user.id, req.user.email)
        const user = await userRepo.findOne({where: {id: req.user.id}})
        if (!user) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        return res.json({token, user})
    }
}

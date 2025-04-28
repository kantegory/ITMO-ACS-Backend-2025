import { BaseController } from "../common/BaseController";
import { Request, Response } from "express";
import { User } from "../models/User";
import { checkPassword, hashPassword, validateLogin, validateRegister } from "../utils/AuthUtils";
import { ValidationErrors } from "../utils/ValidationErrors";
import { UserService } from "../services/UserService";
import jwt = require("jsonwebtoken");
import SETTINGS from "../config/settings";

export class AuthController extends BaseController<User> {
    protected service: UserService;

    constructor () {
        super(User);
        this.service = new UserService();
    }

    register = async (request: Request, response: Response) => {
        const errors = new ValidationErrors();
        await validateRegister(request.body, errors, this.service);
        if (errors.isError) {  // throw exception
            response.status(422).json({errors: errors.errors});
            return;
        }
        
        const hash = hashPassword(request.body.password)
        const dto = {
            "username": request.body.username,
            "password": hash
        }
        try {
            const entity = await this.service.createEntity(dto);
            response.status(201).json(entity);
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    login = async (request: Request, response: Response) => {
        const errors = new ValidationErrors();
        validateLogin(request.body, errors);
        if (errors.isError) {
            response.status(422).json({errors: errors.errors});
            return;
        }
        
        const dto = {
            "username": request.body.username,
            "password": request.body.password
        };
        const user = await this.service.getEntityByUsername(dto.username);
        if (!user) {
            response.status(400).json({message: "Username or password incorrect"})
            return;
        }

        if (!checkPassword(dto.password, user.password)) {
            response.status(400).json({message: "Username or password incorrect"})
            return;
        }

        const accessToken = jwt.sign(
            {user: {
                id: user.id
            }},
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            }
        );

        response.json({"access_token": accessToken});
    }
}
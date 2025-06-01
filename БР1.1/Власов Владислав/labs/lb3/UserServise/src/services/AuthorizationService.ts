import 'reflect-metadata';

import { User } from "../models/User";
import jwt from 'jsonwebtoken';


import { Repository, ObjectLiteral } from 'typeorm';
import dataSource from '../config/data-source';
import { HttpError } from "routing-controllers";
import { IAuthorizationService } from "./interfaces/IAuthorizationService";
import { LoginDto } from "../dtos/loginDto";
import SETTINGS from "../config/settings";
import { ServicesValidator } from "../validators/ServicesValidator";

export class AuthorizationService implements IAuthorizationService
{

    _repository: Repository<ObjectLiteral>
    _validator: ServicesValidator

    constructor()
    {
        this._repository = dataSource.getRepository(User)
        this._validator = new ServicesValidator()
    }

    async login(user: LoginDto): Promise<string> {
        const userDB = await this._repository.findOneBy({email:user.email})
        if (!userDB)
        {
            throw new HttpError(401, "Password or email is incorrect");
        }

        //this._validator.checkPassword(userDB.password, user.password)

        const accessToken = jwt.sign(
            { id: userDB.id },
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            },
        );

        return accessToken;
    }
}
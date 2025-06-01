
import { User } from "../models/User";
import jwt from 'jsonwebtoken';

import 'reflect-metadata';
import { Repository, ObjectLiteral } from 'typeorm';
import dataSource from '../config/data-source';
import { HttpError } from "routing-controllers";
import { IAuthorizationService } from "./interfaces/IAuthorizationService";
import { LoginDto } from "../dtos/loginDto";
import checkPassword from "../utils/checkPassword";
import SETTINGS from "../config/settings";

export class AuthorizationService implements IAuthorizationService
{

    _repository: Repository<ObjectLiteral>

    constructor()
    {
        this._repository = dataSource.getRepository(User)
    }

    async login(user: LoginDto): Promise<string> {
        const userDB = await this._repository.findOneBy({email:user.email})
        if (!userDB)
        {
            throw new HttpError(401, "Password or email is incorrect");
        }

        if (!checkPassword(userDB.password, user.password))
        {
            throw new HttpError(401, "Password or email is incorrect");
        }

        const accessToken = jwt.sign(
            { email: userDB.email },
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            },
        );

        return accessToken;
    }
}
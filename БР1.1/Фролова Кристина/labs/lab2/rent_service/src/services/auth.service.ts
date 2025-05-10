import userService from "./user.service";
import checkPassword from "../utils/check-password";
import {LoginRequestDto} from "../models/requests/auth/login-request.dto";
import jwt from 'jsonwebtoken';
import SETTINGS from "../config/settings";
import {UserEntity} from "../entities/user.entity";
import EntityExistsError from "../errors/entity-exists.error";
import {UserTokenPayload} from "../models/models/user-token-payload.model";
import {BadRequest} from "http-errors";
import {User} from "../models/models/user.model";
import {RegisterRequestModel} from "../models/requests/auth/register-request.model";


class AuthService {

    public async login(loginRequest: LoginRequestDto): Promise<string> {
        const user = await userService.getUserByMail(loginRequest.mail);
        const userPassword = user.password;
        if (!checkPassword(userPassword, loginRequest.password)) {
            throw new BadRequest("Email or password is incorrect");
        }
        const userTokenPayload: UserTokenPayload = {
            id: user.id,
            mail: user.mail,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        return jwt.sign(
            {user: userTokenPayload},
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            }
        );
    }

    public async register(registerRequest: RegisterRequestModel): Promise<User> {
        if (await userService.existsByEmail(registerRequest.mail)) {
            throw new EntityExistsError(UserEntity, registerRequest.mail, "mail");
        }
        return await userService.create(registerRequest);
    }
}

export default new AuthService();
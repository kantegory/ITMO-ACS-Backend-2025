import userService from "./user.service";
import checkPassword from "../utils/check-password";
import {LoginRequestDto} from "../models/login-request.model";
import jwt from 'jsonwebtoken';
import SETTINGS from "../config/settings";
import {RegisterRequestModel} from "../models/register-request.model";
import {UserEntity} from "../entities/user.entity";
import hashPassword from "../utils/hash-password";
import {toUser} from "../mappers/user.mapper";
import EntityExistsError from "../errors/entity-exists.error";
import {UserTokenPayload} from "../models/user-token-payload.model";
import {BadRequest} from "http-errors";


class AuthService {

    public async login(loginRequest: LoginRequestDto) {
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

        const accessToken = jwt.sign(
            { user: userTokenPayload },
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            }
        );
        return {accessToken}
    }

    public async register(registerRequest: RegisterRequestModel) {
        if (await userService.existsByEmail(registerRequest.mail)) {
            throw new EntityExistsError(UserEntity, registerRequest.mail, "mail");
        }
        const userEntity = new UserEntity();
        userEntity.mail = registerRequest.mail;
        userEntity.password = hashPassword(registerRequest.password);
        userEntity.firstName = registerRequest.firstName;
        userEntity.lastName = registerRequest.lastName;
        const savedUser = await userService.create(userEntity);
        return toUser(savedUser);
    }
}

export default new AuthService();
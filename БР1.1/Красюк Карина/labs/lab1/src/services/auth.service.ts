import userService from "./user.service";
import {LoginRequestModel} from "../models/login-request.model";
import checkPassword from "../utils/check-password";
import {HttpError} from "routing-controllers";
import SETTINGS from "../config/settings";
import jwt from "jsonwebtoken";
import hashPassword from "../utils/hash-password";
import {RegisterRequestModel} from "../models/register-request.model";
import {User} from "../entities/user.entity";

class AuthService {
    public async login(loginRequest: LoginRequestModel) {
        const user = await userService.getUserByMail(loginRequest.email);
        const userPassword = user.passwordHash;
        if (!checkPassword(userPassword, loginRequest.password)) {
            throw new HttpError(401, "Email or password is incorrect");
        }

        const accessToken = jwt.sign(
            { user: { id: user.id } },
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            }
        );
        return {accessToken}
    }

    public async register(registerRequest: RegisterRequestModel) {
        if (await userService.getUserByMail(registerRequest.email)) {
            throw new HttpError(400, "User already exists");
        }
        const newUser =  {
            email: registerRequest.email,
            name: registerRequest.name,
            passwordHash: hashPassword(registerRequest.password),
        } as User
        
        return await userService.create(newUser);
    }
}

export default new AuthService();
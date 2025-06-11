import {User} from "../entities/user.entity";
import {LoginRequestModel} from "../models/login-request.model";
import {LoginResponseModel} from "../models/login-response.model";
import authService from "../services/auth.service";
import {RegisterRequestModel} from "../models/register-request.model";
import {Body, Controller, Post} from "routing-controllers";


@Controller('/auth')
export class AuthController {
    @Post('/login')
    async login(@Body() loginData: LoginRequestModel): Promise<LoginResponseModel> {
        return await authService.login(loginData);
    }

    @Post("/register")
    async register(@Body() registerData: RegisterRequestModel): Promise<User> {
        return await authService.register(registerData);
    }
}

export default AuthController;
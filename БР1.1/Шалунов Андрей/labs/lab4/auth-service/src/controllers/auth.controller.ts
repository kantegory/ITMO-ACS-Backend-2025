import {
    JsonController,
    Post,
    Body,
    HttpCode
} from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

import { RegisterDto, LoginDto } from '../dto/auth.dto'
import { AuthService } from '../services/auth.service'

class AuthResponse {
    user_id!: number
    email!: string
    name!: string
}

class TokenResponse {
    token!: string
}

class ErrorResponse {
    message!: string
}

@JsonController()
export class AuthController {
    @Post('/register')
    @HttpCode(201)
    @OpenAPI({ summary: 'Register new user' })
    @ResponseSchema(AuthResponse, { statusCode: 201 })
    @ResponseSchema(ErrorResponse, { statusCode: 400 })
    async register(@Body() dto: RegisterDto) {
        return AuthService.register(dto)
    }

    @Post('/login')
    @OpenAPI({ summary: 'Login and get JWT token' })
    @ResponseSchema(TokenResponse, { statusCode: 200 })
    @ResponseSchema(ErrorResponse, { statusCode: 401 })
    async login(@Body() dto: LoginDto) {
        return AuthService.login(dto)
    }
}
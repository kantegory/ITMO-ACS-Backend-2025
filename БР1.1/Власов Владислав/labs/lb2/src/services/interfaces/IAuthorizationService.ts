import { ObjectLiteral } from "typeorm";
import { CreateUserDto } from "../../dtos/createUserDto";
import { LoginDto } from "../../dtos/loginDto";

export interface IAuthorizationService
{
    login(user: LoginDto): Promise<string>
}
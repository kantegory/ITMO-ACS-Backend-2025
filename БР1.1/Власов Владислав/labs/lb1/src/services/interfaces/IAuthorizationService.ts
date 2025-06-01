import { ObjectLiteral } from "typeorm";
import { createUserDto } from "../../dtos/createUserDto";
import { LoginDto } from "../../dtos/loginDto";

export interface IAuthorizationService
{
    login(user: LoginDto): Promise<string>
}
import { LoginDto } from "../../dtos/loginDto";

export interface IAuthorizationService
{
    login(user: LoginDto): Promise<string>
}
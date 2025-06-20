import { ObjectLiteral } from "typeorm";
import { CreateUserDto } from "../../dtos/createUserDto";

export interface IUserService
{
    getAllUser(): Promise<ObjectLiteral[]>
    getUser(id: number): Promise<ObjectLiteral>
    getUserByEmail(email: string): Promise<ObjectLiteral>
    createUser(user: CreateUserDto): Promise<ObjectLiteral>
    updateUser(id: number, user: CreateUserDto): Promise<ObjectLiteral>
    deleteUser(id: number): Promise<void>
}
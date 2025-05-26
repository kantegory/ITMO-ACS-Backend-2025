import { ObjectLiteral } from "typeorm";
import { createUserDto } from "../../dtos/createUserDto";

export interface IUserService
{
    getAllUser(): Promise<ObjectLiteral[]>
    getUser(id: number): Promise<ObjectLiteral>
    getUserByEmail(email: string): Promise<ObjectLiteral>
    createUser(user: createUserDto): Promise<ObjectLiteral>
    updateUser(id: number, user: createUserDto): Promise<ObjectLiteral>
    deleteUser(id: number): Promise<void>
}
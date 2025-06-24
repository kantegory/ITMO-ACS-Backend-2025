import { CreateUserDto } from "../dtos/createUserDto";
import { User } from "../models/User";
import { IUserService } from "./interfaces/IUserService";

import 'reflect-metadata';
import { Repository, ObjectLiteral } from 'typeorm';
import dataSource from '../config/data-source';
import hashPassword from "../utils/hashPassword";
import { HttpError } from "routing-controllers";

export class UserService implements IUserService
{

    _repository: Repository<ObjectLiteral>

    constructor()
    {
        this._repository = dataSource.getRepository(User)
    }

    async getAllUser(): Promise<ObjectLiteral[]> {
        return await this._repository.find()
    }

    async getUser(id: number): Promise<ObjectLiteral> {
        return await this._repository.findOneBy({id})
    }

    async getUserByEmail(email: string): Promise<ObjectLiteral> {
        return await this._repository.findOneBy({email})
    }

    async createUser(user: CreateUserDto): Promise<ObjectLiteral> {
        user.password = hashPassword(user.password)
        const createdUser = this._repository.create(user);
        const results = await this._repository.save(createdUser);
        return results
    }

    async updateUser(id: number, user: CreateUserDto): Promise<ObjectLiteral> {

        const userDB = await this._repository.findOneBy({id})
        if (!userDB)
        {
            throw new HttpError(404, "User not found!");
        }

        if (user.password)
        {
            user.password = hashPassword(user.password)
        }

        Object.assign(userDB, user);
        const results = await this._repository.save(userDB)
        return results
    }

    async deleteUser(id: number): Promise<void> {
        const userDB = await this._repository.findOneBy({id})
        if (!userDB)
        {
            throw new HttpError(404, "User not found!");
        }

        await this._repository.delete(id)
    }

}
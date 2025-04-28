import { Request, Response } from 'express';
import { IUserService } from '../services/UserService';
import { BaseHandler, HttpCodes } from './BaseHandler';
import { ResponseUserDto } from '../dtos/UserDtos';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';


export class UserHandler extends BaseHandler {
    private readonly service : IUserService

    constructor(service : IUserService) {
        super()
        this.service = service
    }

    protected initRoutes(): void {
        this.router.get("/",  this.getUserList.bind(this))
        this.router.get("/:id", this.getUserById.bind(this))
        this.router.post("/", this.createUser.bind(this))
        this.router.patch("/:id", this.updateUser.bind(this))
    }

    async getUserList(req: Request, res: Response) {
        const userDtos = await this.service.findAll()
        this.success(res, userDtos, HttpCodes.OK)
    }

    async getUserById(req: Request, res: Response) {
        const userDto: ResponseUserDto | null = await this.service.findById(Number(req.params.id), ["rents", "properties"])
        if (!userDto)
            this.error(res, HttpCodes.NOT_FOUND, "User not found")
        this.success(res, userDto, HttpCodes.OK)
    }

    async createUser(req: Request, res: Response) {
        try {
            const userDto = await this.service.register(req.body)
            console.log(userDto)
            this.success(res, userDto, HttpCodes.CREATED)
        } catch (error: any) {
            if (error instanceof UserAlreadyExistsError)
                this.error(res, HttpCodes.CONFLICT, "Email already taken")
            console.log(error)
            this.error(res, HttpCodes.INTERNAL_SERVER_ERROR, "Server error")
        }
    }

    async updateUser(req: Request, res: Response) {
        // TODO: implement user update
    }
}

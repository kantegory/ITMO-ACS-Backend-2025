import { Request, Response } from 'express';
import { FindManyOptions } from 'typeorm';
import { IRentService } from '../services/RentService';
import { BaseHandler, HttpCodes } from './BaseHandler';
import { ResponseRentDto, ChangeRentDto } from '../dtos/RentDtos';
import { Rent } from '../models/RentModel';


export class RentHandler extends BaseHandler {
    private readonly service : IRentService

    constructor(service : IRentService) {
        super()
        this.service = service
    }

    protected initRoutes(): void {
        this.router.get("/:userId", this.getUserRents.bind(this))
        this.router.post("/", this.createRent.bind(this))
        this.router.patch("/:id", this.updateRent.bind(this))
    }

    async getUserRents(req: Request, res: Response) {
        const userId = req.params.userId
        try {
            const options: FindManyOptions<Rent> = {
                where: { renting : { id: Number(userId) } } 
            }
            const foundDtos = await this.service.findAll(options)
            this.success(res, { "rents of user" : foundDtos}, HttpCodes.OK)
        } catch (error: any) {
            console.log(error)
            this.error(res, HttpCodes.INTERNAL_SERVER_ERROR, "User rents search failed")
        }
    }

    async createRent(req: Request, res: Response) {
        try {
            const rentDto: ResponseRentDto = await this.service.startRent(req.body)
            this.success(res, { "created": rentDto }, HttpCodes.CREATED)
        } catch (error: any) {
            console.log(error)
            this.error(res, HttpCodes.INTERNAL_SERVER_ERROR, "Can't create rent")
        }
    }

    async updateRent(req: Request, res: Response) {
        const id = Number(req.params.id)
        const changeDto: ChangeRentDto = new ChangeRentDto({ id: id, ...req.body })
        try {
            const rentDto: ResponseRentDto = await this.service.changeRentInfo(changeDto)
            this.success(res, { "updatedRent": rentDto }, HttpCodes.ACCEPTED)
        } catch (error: any) {
            console.log(error)
            this.error(res, HttpCodes.INTERNAL_SERVER_ERROR, "Can't update rent")
        }
    }
}

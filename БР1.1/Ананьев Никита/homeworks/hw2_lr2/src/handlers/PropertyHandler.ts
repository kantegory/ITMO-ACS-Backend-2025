import { Request, Response } from 'express';
import { IPropertyService } from '../services/PropertyService';
import { BaseHandler, HttpCodes } from './BaseHandler';
import { ResponsePropertyDto } from '../dtos/PropertyDtos';

export class PropertyHandler extends BaseHandler {
    private readonly service: IPropertyService

    constructor(service: IPropertyService){
        super()
        this.service = service
    }

    protected initRoutes(): void {
        this.router.get("/:id", this.getProperty.bind(this))
        this.router.post("/", this.createProperty.bind(this))
    }

    async getProperty(req: Request, res: Response) {
        const id = Number(req.params.id)
        try {
            const propertyDto = this.service.findById(id, ["user"])
            if (!propertyDto) {
                this.error(res, HttpCodes.NOT_FOUND, "Can't find property with this id")
                return
            }
            this.success(res, propertyDto, HttpCodes.OK)
        } catch (error: any) {
            console.log(error)
            this.error(res, HttpCodes.INTERNAL_SERVER_ERROR, "Error during get property request")
        }
    }

    async createProperty(req: Request, res: Response) {
        try {
            const propertyDto: ResponsePropertyDto = await this.service.register(req.body)
            this.success(res, { "created": propertyDto }, HttpCodes.CREATED)
        } catch (error: any) {
            console.log(error)
            this.error(res, HttpCodes.INTERNAL_SERVER_ERROR, "Can't create property")
        }
    }
}

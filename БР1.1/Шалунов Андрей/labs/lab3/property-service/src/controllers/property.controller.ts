import {
    JsonController,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    UseBefore,
    Req
} from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'
import { CreatePropertyDto, UpdatePropertyDto } from '../dto/property.dto'
import { PropertyService } from '../services/property.service'
import { AuthMiddleware } from '../middlewares/auth.middleware'

@JsonController()
@UseBefore(AuthMiddleware)
export class PropertyController {
    @Post('/')
    @HttpCode(201)
    @OpenAPI({ summary: 'Create property' })
    @ResponseSchema(CreatePropertyDto, { statusCode: 201 })
    async create(
        @Body() dto: CreatePropertyDto,
        @Req()  req: any
    ) {
        const authHeader = req.header('Authorization')
        return PropertyService.createProperty(dto, authHeader)
    }

    @Get('/')
    @OpenAPI({ summary: 'Get all properties' })
    @ResponseSchema(CreatePropertyDto, { isArray: true })
    async findAll() {
        return PropertyService.getAllProperties()
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Get property by id' })
    @ResponseSchema(CreatePropertyDto)
    async findOne(@Param('id') id: number) {
        return PropertyService.getPropertyById(id)
    }

    @Put('/:id')
    @OpenAPI({ summary: 'Update property' })
    @ResponseSchema(UpdatePropertyDto)
    async update(
        @Param('id') id: number,
        @Body() dto: UpdatePropertyDto,
        @Req()  req: any
    ) {
        const authHeader = req.header('Authorization')
        return PropertyService.updateProperty(id, dto, authHeader)
    }

    @Delete('/:id')
    @HttpCode(204)
    @OpenAPI({ summary: 'Delete property' })
    async remove(@Param('id') id: number) {
        await PropertyService.deleteProperty(id)
    }
}
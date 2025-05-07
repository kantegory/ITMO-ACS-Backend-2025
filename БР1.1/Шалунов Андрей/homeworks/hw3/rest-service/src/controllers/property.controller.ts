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
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CreatePropertyDto, UpdatePropertyDto } from '../dto/property.dto';
import { PropertyService } from '../services/property.service';
import { authMiddleware } from '../middlewares/auth.middleware';

@JsonController('/properties')
@UseBefore(authMiddleware)
export class PropertyController {
    @Post('/')
    @HttpCode(201)
    @OpenAPI({ summary: 'Create property' })
    @ResponseSchema(CreatePropertyDto, { statusCode: 201 })
    async create(@Body() dto: CreatePropertyDto) {
        return PropertyService.createProperty(dto);
    }

    @Get('/')
    @OpenAPI({ summary: 'Get all properties' })
    @ResponseSchema(CreatePropertyDto, { isArray: true })
    async findAll() {
        return PropertyService.getAllProperties();
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Get property by id' })
    @ResponseSchema(CreatePropertyDto)
    async findOne(@Param('id') id: number) {
        const p = await PropertyService.getPropertyById(id);
        if (!p) throw { status: 404, message: 'Property not found' };
        return p;
    }

    @Put('/:id')
    @OpenAPI({ summary: 'Update property' })
    @ResponseSchema(UpdatePropertyDto)
    async update(@Param('id') id: number, @Body() dto: UpdatePropertyDto) {
        return PropertyService.updateProperty(id, dto);
    }

    @Delete('/:id')
    @HttpCode(204)
    @OpenAPI({ summary: 'Delete property' })
    async remove(@Param('id') id: number) {
        await PropertyService.deleteProperty(id);
    }
}
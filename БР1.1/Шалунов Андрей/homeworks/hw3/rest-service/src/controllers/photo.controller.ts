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
import { CreatePhotoDto, UpdatePhotoDto } from '../dto/photo.dto';
import { PhotoService } from '../services/photo.service';
import { authMiddleware } from '../middlewares/auth.middleware';

@JsonController('/property-photos')
@UseBefore(authMiddleware)
export class PhotoController {
    @Post('/')
    @HttpCode(201)
    @OpenAPI({ summary: 'Upload photo' })
    @ResponseSchema(CreatePhotoDto, { statusCode: 201 })
    async create(@Body() dto: CreatePhotoDto) {
        return PhotoService.createPhoto(dto);
    }

    @Get('/')
    @OpenAPI({ summary: 'Get all photos' })
    @ResponseSchema(CreatePhotoDto, { isArray: true })
    async findAll() {
        return PhotoService.getAllPhotos();
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Get photo by id' })
    @ResponseSchema(CreatePhotoDto)
    async findOne(@Param('id') id: number) {
        const p = await PhotoService.getPhotoById(id);
        if (!p) throw { status: 404, message: 'Photo not found' };
        return p;
    }

    @Put('/:id')
    @OpenAPI({ summary: 'Update photo' })
    @ResponseSchema(UpdatePhotoDto)
    async update(@Param('id') id: number, @Body() dto: UpdatePhotoDto) {
        return PhotoService.updatePhoto(id, dto);
    }

    @Delete('/:id')
    @HttpCode(204)
    @OpenAPI({ summary: 'Delete photo' })
    async remove(@Param('id') id: number) {
        await PhotoService.deletePhoto(id);
    }
}  
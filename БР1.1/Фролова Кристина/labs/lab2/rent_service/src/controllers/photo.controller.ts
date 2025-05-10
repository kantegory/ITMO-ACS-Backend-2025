import {Body, Controller, Delete, Get, Path, Put, Response, Route, Security, SuccessResponse, Tags} from "tsoa";

import {Photo} from "../models/models/photo.model";
import photoService from "../services/photo.service";
import {PhotoResponseDto} from "../models/responses/photo-response.dto";
import {toPhotoResponseModel, updatePhotoRequestDtoToModel} from "../mappers/photo.mapper";
import {UpdatePhotoRequestDto} from "../models/requests/photo/photo-update-request.dto";
import {EntityNotFoundError} from "../models/errors/entity-not-found.model";

@Route("photos")
@Tags("Photo")
export class PhotoController extends Controller {

    @Get()
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getPhotos(): Promise<PhotoResponseDto[]> {
        const photos: Photo[] = await photoService.getAll();
        return photos.map(toPhotoResponseModel);
    }

    @Get("{photoId}")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getPhotoById(@Path() photoId: number): Promise<PhotoResponseDto> {
        const photo = await photoService.getById(photoId);
        return toPhotoResponseModel(photo);
    }

    @Put("{photoId}")
    @SuccessResponse("200", "Updated")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async updatePhoto(
        @Path() photoId: number,
        @Body() body: UpdatePhotoRequestDto
    ): Promise<PhotoResponseDto> {
        const updated = await photoService.update(photoId, updatePhotoRequestDtoToModel(body));
        return toPhotoResponseModel(updated);
    }

    @Delete("{photoId}")
    @SuccessResponse("204", "Deleted")
    @Security("jwt")
    public async deletePhoto(@Path() photoId: number): Promise<void> {
        await photoService.delete(photoId);
    }
}

import {Body, Controller, Delete, Get, Path, Post, Put, Response, Route, Security, SuccessResponse, Tags} from "tsoa";
import {EntityNotFoundError} from "../models/errors/entity-not-found.model";
import {RentalResponseDto} from "../models/responses/rental-response.dto";
import {toRentalResponseModel} from "../mappers/rental.mapper";
import {PhotoResponseDto} from "../models/responses/photo-response.dto";
import {CreatePhotoRequestDto} from "../models/requests/photo/photo-create-request.dto";
import {createPhotoRequestDtoToModel, toPhotoResponseModel} from "../mappers/photo.mapper";
import advertisementService from "../services/advertisement.service";
import {
    createAdvertisementRequestToModel,
    toAdvertisementResponseModel,
    updateAdvertisementRequestToModel
} from "../mappers/advertisement.mapper";
import {AdvertisementResponseDto} from "../models/responses/advertisement-response.dto";
import {CreateAdvertisementRequestDto} from "../models/requests/advertisement/advertisement-create-request.dto";
import {UpdateAdvertisementRequestDto} from "../models/requests/advertisement/advertisement-update-request.dto";
import {MessageResponseDto} from "../models/responses/message-response.dto";
import {toMessageResponseModel} from "../mappers/message.mapper";

@Route("advertisements")
@Tags("Advertisement")
export class AdvertisementController extends Controller {

    @Get()
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    public async getAll(): Promise<AdvertisementResponseDto[]> {
        const advertisements = await advertisementService.getAll();
        return advertisements.map(toAdvertisementResponseModel);
    }

    @Get("{advertisementId}")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getById(@Path() advertisementId: number): Promise<AdvertisementResponseDto> {
        const advertisement = await advertisementService.getById(advertisementId);
        return toAdvertisementResponseModel(advertisement);
    }

    @Post()
    @SuccessResponse("201", "Created")
    @Security("jwt")
    public async create(
        @Body() body: CreateAdvertisementRequestDto
    ): Promise<AdvertisementResponseDto> {
        const advertisement = await advertisementService.create(createAdvertisementRequestToModel(body));
        return toAdvertisementResponseModel(advertisement);
    }

    @Put("{advertisementId}")
    @SuccessResponse("200", "Updated")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async update(
        @Path() advertisementId: number,
        @Body() body: UpdateAdvertisementRequestDto
    ): Promise<AdvertisementResponseDto> {
        const ad = await advertisementService.update(advertisementId, updateAdvertisementRequestToModel(body));
        return toAdvertisementResponseModel(ad);
    }

    @Delete("{advertisementId}")
    @SuccessResponse("204", "Deleted")
    @Security("jwt")
    public async delete(@Path() advertisementId: number): Promise<void> {
        await advertisementService.delete(advertisementId);
    }

    @Get("{advertisementId}/rentals")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getRentalsByAdvertisementId(@Path() advertisementId: number): Promise<RentalResponseDto[]> {
        const rentals = await advertisementService.getRentalsByAdvertisementId(advertisementId);
        return rentals.map(toRentalResponseModel);
    }

    @Get("{advertisementId}/photos")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getPhotosByAdvertisement(@Path() advertisementId: number): Promise<PhotoResponseDto[]> {
        const photos = await advertisementService.getPhotosByAdvertisementId(advertisementId);
        return photos.map(toPhotoResponseModel);
    }

    @Post("{advertisementId}/photos")
    @SuccessResponse("201", "Created")
    @Security("jwt")
    public async createPhoto(@Path() advertisementId: number, @Body() body: CreatePhotoRequestDto): Promise<PhotoResponseDto> {
        const photo = await advertisementService.addPhotoToAdvertisement(advertisementId, createPhotoRequestDtoToModel(body));
        return toPhotoResponseModel(photo);
    }

    @Get("{advertisementId}/messages")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getMessagesForAdvertisement(@Path() advertisementId: number): Promise<MessageResponseDto[]> {
        const messages = await advertisementService.getMessagesForAdvertisement(advertisementId);
        return messages.map(toMessageResponseModel);
    }

}
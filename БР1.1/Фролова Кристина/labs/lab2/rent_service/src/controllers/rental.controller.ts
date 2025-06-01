import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Response,
    Route,
    Security,
    SuccessResponse,
    Tags
} from "tsoa";

import rentalService from "../services/rental.service";
import {RentalResponseDto} from "../models/responses/rental-response.dto";
import {EntityNotFoundError} from "../models/errors/entity-not-found.model";
import {Rental} from "../models/models/rental.model";
import {UpdateRentalRequestDto} from "../models/requests/rental/rental-update.dto";
import {CreateRentalRequestDto} from "../models/requests/rental/rental-create.dto";
import {createRentalRequestToRentalData, toRentalResponseModel} from "../mappers/rental.mapper";

@Route("rentals")
@Tags("Rental")
export class RentalController extends Controller {

    @Get()
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getRentals(): Promise<RentalResponseDto[]> {
        const rentals: Rental[] = await rentalService.getAll();
        return rentals.map(toRentalResponseModel);
    }

    @Get("{rentalId}")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getRentalById(@Path() rentalId: number): Promise<RentalResponseDto> {
        const rental = await rentalService.getById(rentalId);
        return toRentalResponseModel(rental);
    }

    @Post()
    @SuccessResponse("201", "Created")
    @Security("jwt")
    public async createRental(
        @Body() createRequest: CreateRentalRequestDto
    ): Promise<RentalResponseDto> {
        const rentalData = createRentalRequestToRentalData(createRequest);
        const rental = await rentalService.create(rentalData);
        return toRentalResponseModel(rental);
    }

    @Put("{rentalId}")
    @SuccessResponse("200", "Updated")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async updateRental(
        @Path() rentalId: number,
        @Body() body: UpdateRentalRequestDto
    ): Promise<RentalResponseDto> {
        const updated = await rentalService.update(rentalId, body);
        return toRentalResponseModel(updated);
    }

    @Delete("{rentalId}")
    @SuccessResponse("204", "Deleted")
    @Security("jwt")
    public async deleteRental(@Path() rentalId: number): Promise<void> {
        await rentalService.delete(rentalId);
    }
}

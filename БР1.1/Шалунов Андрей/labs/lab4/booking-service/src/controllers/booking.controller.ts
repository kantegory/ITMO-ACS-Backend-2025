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
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto'
import { BookingService } from '../services/booking.service'
import { AuthMiddleware } from '../middlewares/auth.middleware'

@JsonController()
@UseBefore(AuthMiddleware)
export class BookingController {
    @Post('/')
    @HttpCode(201)
    @OpenAPI({ summary: 'Create booking' })
    @ResponseSchema(CreateBookingDto, { statusCode: 201 })
    async create(@Body() dto: CreateBookingDto, @Req() req: any) {
        const authHeader = req.header('Authorization')
        return BookingService.createBooking(dto, authHeader)
    }

    @Get('/')
    @OpenAPI({ summary: 'Get all bookings' })
    @ResponseSchema(CreateBookingDto, { isArray: true })
    async findAll() {
        return BookingService.getAllBookings()
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Get booking by id' })
    @ResponseSchema(CreateBookingDto)
    async findOne(@Param('id') id: number) {
        return BookingService.getBookingById(id)
    }

    @Put('/:id')
    @OpenAPI({ summary: 'Update booking' })
    @ResponseSchema(UpdateBookingDto)
    async update(@Param('id') id: number, @Body() dto: UpdateBookingDto) {
        return BookingService.updateBooking(id, dto)
    }

    @Delete('/:id')
    @HttpCode(204)
    @OpenAPI({ summary: 'Delete booking' })
    async remove(@Param('id') id: number) {
        await BookingService.deleteBooking(id)
    }
}
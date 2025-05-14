import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class BookingController {
    static async create(req: Request, res: Response) {
        const dto = plainToInstance(CreateBookingDto, req.body);
        await validateOrReject(dto);
        const booking = await BookingService.createBooking(dto);
        res.status(201).json(booking);
    }

    static async findAll(_: Request, res: Response) {
        const list = await BookingService.getAllBookings();
        res.json(list);
    }

    static async findOne(req: Request, res: Response) {
        const id = Number(req.params.id);
        const booking = await BookingService.getBookingById(id);
        if (!booking) { 
            const err: any = new Error('Booking not found');
            err.status = 404;
            throw err;
        }
        res.json(booking);
    }

    static async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const dto = plainToInstance(UpdateBookingDto, req.body);
        await validateOrReject(dto);
        const updated = await BookingService.updateBooking(id, dto);
        res.json(updated);
    }

    static async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        await BookingService.deleteBooking(id);
        res.sendStatus(204);
    }
}
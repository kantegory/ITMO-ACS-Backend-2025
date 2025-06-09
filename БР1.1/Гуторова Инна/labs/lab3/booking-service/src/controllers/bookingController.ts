import { Request, Response } from 'express';
import { BookingService } from '../services/bookingService';

export class BookingController {
    static async create(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1] || '';
            const booking = await BookingService.create(
                {
                    user_id: req.user!.id,
                    trip_id: req.body.trip_id,
                    participants_count: req.body.participants_count
                }
            );
            res.status(201).json(booking);
        } catch (error: any) {
            res.status(400).json({ 
                message: error.message,
                code: 'BOOKING_CREATION_FAILED'
            });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const bookings = await BookingService.getAll();
            res.json(bookings);
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                code: 'FETCH_BOOKINGS_FAILED'
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const booking = await BookingService.getById(Number(req.params.id));
            booking 
                ? res.json(booking)
                : res.status(404).json({ message: 'Booking not found' });
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                code: 'FETCH_BOOKING_FAILED'
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1] || '';
            const booking = await BookingService.update(
                Number(req.params.id),
                req.body
            );
            res.json(booking);
        } catch (error: any) {
            res.status(400).json({
                message: error.message,
                code: 'BOOKING_UPDATE_FAILED'
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await BookingService.delete(Number(req.params.id));
            res.json({ message: 'Booking deleted successfully' });
        } catch (error: any) {
            res.status(400).json({
                message: error.message,
                code: 'BOOKING_DELETION_FAILED'
            });
        }
    }}
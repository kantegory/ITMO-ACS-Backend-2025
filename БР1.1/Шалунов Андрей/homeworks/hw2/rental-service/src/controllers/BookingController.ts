import { Request, Response } from 'express';
import * as bookingService from '../services/BookingService';

export const create = async (request: Request, response: Response) => {
    const booking = await bookingService.createBooking(request.body);
    response.status(201).json(booking);
};

export const findAll = async (_: Request, response: Response) => {
    const bookings = await bookingService.getAllBookings();
    response.json(bookings);
};

export const findOne = async (request: Request, response: Response) => {
    const booking = await bookingService.getBookingById(+request.params.id);
    if (!booking) return response.status(404).json({ message: 'Not found' });
    response.json(booking);
};

export const update = async (request: Request, response: Response) => {
    const updated = await bookingService.updateBooking(+request.params.id, request.body);
    response.json(updated);
};

export const remove = async (request: Request, response: Response) => {
    await bookingService.deleteBooking(+request.params.id);
    response.status(204).send();
};
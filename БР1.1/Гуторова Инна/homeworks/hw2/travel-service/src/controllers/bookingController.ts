import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Booking from '../entities/Booking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const newBooking = bookingRepository.create(req.body);
    await bookingRepository.save(newBooking);
    res.status(201).json(newBooking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const bookings = await bookingRepository.find({ relations: ['user', 'trip'] });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOne({
      where: { booking_id: parseInt(req.params.id) },
      relations: ['user', 'trip']
    });
    booking ? res.json(booking) : res.status(404).json({ message: 'Booking not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req: Request, res: Response): Promise<any> => {
  try {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOneBy({ booking_id: parseInt(req.params.id) });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    bookingRepository.merge(booking, req.body);
    const result = await bookingRepository.save(booking);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(Booking).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'Booking deleted' })
      : res.status(404).json({ message: 'Booking not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
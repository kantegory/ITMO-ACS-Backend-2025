import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Booking } from "../entities/Booking";

export default class BookingController {
    async getAll(req: Request, res: Response) {
        const bookings = await AppDataSource.getRepository(Booking).find({
            relations: ["user", "route"]
        });
        res.json(bookings);
    }

    async getByUser(req: Request, res: Response) {
        const bookings = await AppDataSource.getRepository(Booking).find({
            where: { user: { id: parseInt(req.params.userId) } },
            relations: ["route"]
        });
        res.json(bookings);
    }

    async create(req: Request, res: Response) {
        const booking = AppDataSource.getRepository(Booking).create(req.body);
        const results = await AppDataSource.getRepository(Booking).save(booking);
        res.status(201).json(results);
    }

    async updateStatus(req: Request, res: Response) {
        const booking = await AppDataSource.getRepository(Booking).findOneBy({
            id: parseInt(req.params.id)
        });
        if (booking) {
            booking.status = req.body.status;
            const results = await AppDataSource.getRepository(Booking).save(booking);
            res.json(results);
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    }

    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Booking).delete(req.params.id);
        res.json(results);
    }
}
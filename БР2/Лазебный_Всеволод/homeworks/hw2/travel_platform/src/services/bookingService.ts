import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Booking } from "../entities/Booking";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const bookings = await AppDataSource.getRepository(Booking).find({
        relations: ["user", "route"]
    });
    res.json(bookings);
});

router.get("/user/:userId", async (req: Request, res: Response) => {
    const bookings = await AppDataSource.getRepository(Booking).find({
        where: { user: { id: parseInt(req.params.userId) } },
        relations: ["route"]
    });
    res.json(bookings);
});

router.post("/", async (req: Request, res: Response) => {
    const booking = AppDataSource.getRepository(Booking).create(req.body);
    const results = await AppDataSource.getRepository(Booking).save(booking);
    res.status(201).json(results);
});

router.put("/:id/status", async (req: Request, res: Response) => {
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
});

router.delete("/:id", async (req: Request, res: Response) => {
    const results = await AppDataSource.getRepository(Booking).delete(req.params.id);
    res.json(results);
});

export default router;
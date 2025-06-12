import { Request, Response } from 'express';
import { RoomRepository } from '../repositories/roomRepo';

export class RoomController {
    private roomRepo: RoomRepository;

    constructor() {
        this.roomRepo = new RoomRepository();
    }

    async createRoom(req: Request, res: Response) {
        const room = await this.roomRepo.createRoom(req.body);
        res.status(201).json(room);
    }

    async getRooms(req: Request, res: Response) {
        const rooms = await this.roomRepo.findWithFilters(req.query);
        res.json(rooms);
    }

    async getRoomById(req: Request, res: Response) {
        const room = await this.roomRepo.findById(Number(req.params.id));
        res.json(room);
    }

    async updateRoom(req: Request, res: Response) {
        const room = await this.roomRepo.updateRoom(
            Number(req.params.id),
            req.body
        );
        res.json(room);
    }

    async deleteRoom(req: Request, res: Response) {
        await this.roomRepo.deleteRoom(Number(req.params.id));
        res.status(204).send();
    }
}
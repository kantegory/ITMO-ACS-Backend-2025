import { Request, Response } from "express";
import RoomService from "../services/roomService";
import LivingService from "../services/living";

interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

class RoomController {
    createRoom = async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { livingId, locatedIn, roomType } = req.body;

        if (!livingId || !locatedIn || !roomType) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        try {
            const living = await LivingService.getLivingById(Number(livingId));
            const roomData = {
                living,
                locatedIn,
                roomType,
            };
            const room = await RoomService.createRoom(roomData);
            res.status(201).json(room);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getAllRooms = async (_req: Request, res: Response) => {
        try {
            const rooms = await RoomService.getRooms();
            res.json(rooms);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getRoomById = async (req: Request, res: Response) => {
        try {
            const room = await RoomService.getRoomById(Number(req.params.id));
            res.json(room);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    updateRoom = async (req: Request, res: Response) => {
        const { livingId, locatedIn, roomType } = req.body;

        try {
            const updateData: any = {};
            if (livingId) {
                updateData.living = await LivingService.getLivingById(Number(livingId));
            }
            if (locatedIn !== undefined) updateData.locatedIn = locatedIn;
            if (roomType !== undefined) updateData.roomType = roomType;

            const room = await RoomService.updateRoom(Number(req.params.id), updateData);
            res.json(room);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    deleteRoom = async (req: Request, res: Response) => {
        try {
            const result = await RoomService.deleteRoom(Number(req.params.id));
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}

export default new RoomController();

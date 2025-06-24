import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { Room } from "../models/Room";

const roomRepo = AppDataSource.getRepository(Room);


export const createRoom = async (req: Request, res: Response) => {
    try{
        const roomData = req.body;
        const room = roomRepo.create(roomData);
        const savedRoom = await roomRepo.save(room);
        res.status(200).json(savedRoom);
    }catch (error: any){
        res.status(500).json({ message: error.message });
    }
};


export const getAllRooms = async (req: Request, res: Response) =>{
    try{
        const rooms = await roomRepo.find();
        res.json(rooms);
    }catch (error: any){
        res.status(500).json({ message: error.message });
    }
}


export const getRoomById = async (req: Request, res: Response):Promise<any> => {
    try{
        const room = await roomRepo.findOne({where: {id:Number(req.params.id)}});
        if (!room){
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room)
    }catch (error: any){
        res.status(500).json({ message: error.message });
    }
}


export const updateRoom = async (req: Request, res: Response): Promise<any> => {
    try{
        const room = await roomRepo.findOne({where: {id: Number(req.params.id)}});
        if (!room){
            return res.status(404).json({ message: "Room not found" });
        }
        roomRepo.merge(room, req.body);
        const updatedComfort = await roomRepo.save(room);
        res.json(updatedComfort)
    }catch (error: any){
        res.status(500).json({ message: error.message });
    }
};


export const deleteRoom = async (req:Request, res: Response): Promise<any> => {
    try{
        const result = await roomRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Room not found" });
        };
        res.json({ message: "Room deleted successfully" });
    }catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

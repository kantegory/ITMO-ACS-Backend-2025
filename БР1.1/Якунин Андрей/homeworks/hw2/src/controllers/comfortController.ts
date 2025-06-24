import {Request, Response} from "express";
import {AppDataSource} from "../config/AppDataSourse";
import {Comfort} from "../models/Comfort";

const comfortRepo = AppDataSource.getRepository(Comfort);

export const createComfort = async (req: Request, res: Response)=> {
    try{
        const comfortData = req.body;
        const comfort = comfortRepo.create(comfortData);
        const saveComfort = await comfortRepo.save(comfort);
        res.status(200).json(saveComfort);
    }catch (error: any){
        res.status(500).json({ message: error.message });
    }
};


export const getAllComfort = async (req:Request, res: Response)=> {
    try{
        const comforts = await comfortRepo.find();
        res.json(comforts);
    }catch (error: any){
        res.status(500).json({ message: error.message });
    }
};


export const getComfortById = async (req: Request, res:Response):Promise<any> => {
    try{
        const comfort = await comfortRepo.findOne({where: {id: Number(req.params.id)}});
        if (!comfort){
            return res.status(404).json({ message: "Comfort not found" });
        }
        res.json(comfort);
    }catch (error:any){
        res.status(500).json({ message: error.message });
    }
};


export const updateComfort = async (req: Request, res: Response): Promise<any> => {
    try{
        const comfort = await comfortRepo.findOne({where: {id: Number(req.params.id)}});
        if (!comfort){
            return res.status(404).json({ message: "Comfort not found" });
        }
        comfortRepo.merge(comfort, req.body);
        const updatedComfort = await comfortRepo.save(comfort);
        res.json(updatedComfort)
    }catch (error: any){
        res.status(500).json({ message: error.message });
    }
};


export const deleteComfort = async (req:Request, res: Response): Promise<any> => {
    try{
        const result = await comfortRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Comfort not found" });
        };
        res.json({ message: "Comfort deleted successfully" });
    }catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
import { Request, Response } from "express";
import { AppDataSource } from "../AppDataSource";
import { UserDetails } from "../models/UserDetails";

const userDetailsRepo = AppDataSource.getRepository(UserDetails);

export const createUserDetails = async (req: Request, res: Response) => {
  try {
    const userDetailsData = req.body;
    const userDetails = userDetailsRepo.create(userDetailsData);
    const savedUserDetails = await userDetailsRepo.save(userDetails);
    res.status(201).json(savedUserDetails);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserDetails = async (req: Request, res: Response) => {
  try {
    const userDetails = await userDetailsRepo.find();
    res.json(userDetails);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserDetailsById = async (req: Request, res: Response): Promise<any> => {
  try {
    const userDetails = await userDetailsRepo.findOne({ where: { id: req.params.id }, relations: ["user"] });
    if (!userDetails) {
      return res.status(404).json({ message: "User details not found" });
    }
    res.json(userDetails);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const userDetails = await userDetailsRepo.findOne({ where: { id: req.params.id } });
    if (!userDetails) {
      return res.status(404).json({ message: "User details not found" });
    }

    userDetailsRepo.merge(userDetails, req.body);
    const updatedUserDetails = await userDetailsRepo.save(userDetails);
    res.json(updatedUserDetails);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await userDetailsRepo.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "User details not found" });
    }
    res.json({ message: "User details deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

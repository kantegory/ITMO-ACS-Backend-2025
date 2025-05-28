import { Request, Response } from "express";
import { AppDataSource } from "../AppDataSource";
import { Workout } from "../models/Workout";

const workoutRepo = AppDataSource.getRepository(Workout);

export const createWorkout = async (req: Request, res: Response) => {
  try {
    const workoutData = req.body;
    const workout = workoutRepo.create(workoutData);
    const savedWorkout = await workoutRepo.save(workout);
    res.status(201).json(savedWorkout);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await workoutRepo.find();
    res.json(workouts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkoutById = async (req: Request, res: Response): Promise<any> => {
  try {
    const workout = await workoutRepo.findOne({ where: { id: req.params.id }, relations: ["trainingPlans"] });
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWorkout = async (req: Request, res: Response): Promise<any> => {
  try {
    const workout = await workoutRepo.findOne({ where: { id: req.params.id } });
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    workoutRepo.merge(workout, req.body);
    const updatedWorkout = await workoutRepo.save(workout);
    res.json(updatedWorkout);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkout = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await workoutRepo.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

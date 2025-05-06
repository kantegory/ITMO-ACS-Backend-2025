import { AppDataSource } from "../data-source"
import { Workout } from "../entities/Workout"

const workoutRepo = AppDataSource.getRepository(Workout)

export const getAllWorkouts = () => workoutRepo.find()

export const getWorkoutById = (id: number) =>
  workoutRepo.findOne({ where: { id } })

export const createWorkout = (data: Partial<Workout>) => {
  const workout = workoutRepo.create(data)
  return workoutRepo.save(workout)
}

export const updateWorkout = async (id: number, data: Partial<Workout>) => {
  await workoutRepo.update(id, data)
  return getWorkoutById(id)
}

export const deleteWorkout = (id: number) => workoutRepo.delete(id)

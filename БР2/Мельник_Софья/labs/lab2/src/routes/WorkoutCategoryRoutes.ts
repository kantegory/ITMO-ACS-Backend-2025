import { Router } from 'express';
import { getWorkoutCategories, getWorkoutCategoryById, createWorkoutCategory, updateWorkoutCategory, deleteWorkoutCategory } from '../controllers/WorkoutCategoryController';

const workoutCategoryRouter = Router();

workoutCategoryRouter.get('/', getWorkoutCategories);
workoutCategoryRouter.get('/:id', (req, res, next) => {
  getWorkoutCategoryById(req, res).catch(next);
});
workoutCategoryRouter.post('/', createWorkoutCategory);
workoutCategoryRouter.put('/:id', updateWorkoutCategory);
workoutCategoryRouter.delete('/:id', deleteWorkoutCategory);

export default workoutCategoryRouter;
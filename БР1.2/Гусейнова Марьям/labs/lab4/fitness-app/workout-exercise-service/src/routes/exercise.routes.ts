import { Router } from 'express';
import { ExerciseController } from '../controllers/exercise.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async-handler'; 

const router = Router();
const exerciseController = new ExerciseController();

router.get('/', authMiddleware, asyncHandler(exerciseController.getAllExercises));
router.get('/:id', authMiddleware, asyncHandler(exerciseController.getExerciseById));
router.post('/', authMiddleware, asyncHandler(exerciseController.createExercise));
router.put('/:id', authMiddleware, asyncHandler(exerciseController.updateExercise));
router.delete('/:id', authMiddleware, asyncHandler(exerciseController.deleteExercise));

// Внутренний маршрут
router.get('/internal/exists/:id', asyncHandler(exerciseController.getExerciseByIdInternal));

export default router;
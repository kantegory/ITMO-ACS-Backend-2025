import { Router } from 'express';
import { ExerciseController } from '../controllers/exercise.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const exerciseController = new ExerciseController();

router.get('/', authMiddleware, exerciseController.getAllExercises);
router.get('/:id', authMiddleware, exerciseController.getExerciseById);
router.post('/', authMiddleware, exerciseController.createExercise);
router.put('/:id', authMiddleware, exerciseController.updateExercise);
router.delete('/:id', authMiddleware, exerciseController.deleteExercise);

export default router;
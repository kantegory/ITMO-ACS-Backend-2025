import express from 'express';
import { ExerciseController } from '../controllers/exercise.controller';

const router = express.Router();
const exerciseController = new ExerciseController();

router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExerciseById);
router.post('/', exerciseController.createExercise);
router.put('/:id', exerciseController.updateExercise);
router.delete('/:id', exerciseController.deleteExercise);

export default router;
import express from 'express';
import { ExerciseProgressController } from '../controllers/exercise-progress.controller';

const router = express.Router();
const exerciseProgressController = new ExerciseProgressController();

router.get('/', exerciseProgressController.getAllExerciseProgress);
router.get('/:id', exerciseProgressController.getExerciseProgressById);
router.post('/', exerciseProgressController.createExerciseProgress);
router.put('/:id', exerciseProgressController.updateExerciseProgress);
router.delete('/:id', exerciseProgressController.deleteExerciseProgress);

export default router;
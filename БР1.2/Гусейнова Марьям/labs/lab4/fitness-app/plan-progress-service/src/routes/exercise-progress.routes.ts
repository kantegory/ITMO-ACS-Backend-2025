import { Router, Request, Response, RequestHandler } from 'express';
import { ExerciseProgressController } from '../controllers/exercise-progress.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async-handler';

const router = Router();
const exerciseProgressController = new ExerciseProgressController();

router.get('/my-exercise-progresses', authMiddleware, asyncHandler(exerciseProgressController.getAllMyExerciseProgresses));
router.get('/my-exercise-progresses/:exerciseId', authMiddleware, asyncHandler(exerciseProgressController.getMyExerciseProgressesByExercise));
router.get('/', authMiddleware, asyncHandler(exerciseProgressController.getAllExerciseProgress));
router.get('/:id', authMiddleware, asyncHandler(exerciseProgressController.getExerciseProgressById));
router.post('/', authMiddleware, asyncHandler(exerciseProgressController.createExerciseProgress));
router.put('/:id', authMiddleware, asyncHandler(exerciseProgressController.updateExerciseProgress));
router.delete('/:id', authMiddleware, asyncHandler(exerciseProgressController.deleteExerciseProgress));

export default router;
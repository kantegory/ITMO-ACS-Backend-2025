import { Router, Request, Response, RequestHandler } from 'express';
import { ExerciseProgressController } from '../controllers/exercise-progress.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const exerciseProgressController = new ExerciseProgressController();

router.get('/my-exercise-progresses', authMiddleware, exerciseProgressController.getAllMyExerciseProgresses as RequestHandler);
router.get('/my-exercise-progresses/:exerciseId', authMiddleware, exerciseProgressController.getMyExerciseProgressesByExercise as RequestHandler);
router.get('/', authMiddleware, exerciseProgressController.getAllExerciseProgress);
router.get('/:id', authMiddleware, exerciseProgressController.getExerciseProgressById);
router.post('/', authMiddleware, exerciseProgressController.createExerciseProgress);
router.put('/:id', authMiddleware, exerciseProgressController.updateExerciseProgress);
router.delete('/:id', authMiddleware, exerciseProgressController.deleteExerciseProgress);

export default router;
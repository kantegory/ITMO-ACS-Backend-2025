import { Router } from 'express';
import { TrainingController } from '../controllers/training.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const getTrainingRoutes = (trainingController: TrainingController): Router => {
    const router = Router();

    // Все роуты требуют аутентификации
    router.use(authMiddleware);

    // Тренировки
    router.post('/', trainingController.startTraining);
    router.put('/:trainingId', trainingController.endTraining);
    router.get('/:trainingId', trainingController.getTrainingDetails);
    router.get('/', trainingController.getUserTrainings);

    // Заметки и серии
    router.post('/:trainingId/note', trainingController.addNote);
    router.post('/:trainingId/series', trainingController.addSeries);

    return router;
}; 
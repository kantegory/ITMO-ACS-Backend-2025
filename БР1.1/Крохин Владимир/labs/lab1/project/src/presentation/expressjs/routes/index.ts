import { Router } from 'express';
import { getAuthRoutes } from './auth.routes';
import { getTrainingRoutes } from './training.routes';
import { getWeaponTypeRoutes } from './weapon-type.routes';
import { AuthController } from '../controllers/auth.controller';
import { TrainingController } from '../controllers/training.controller';
import { WeaponTypeController } from '../controllers/weapon-type.controller';

export const createRoutes = (
    authController: AuthController,
    trainingController: TrainingController,
    weaponTypeController: WeaponTypeController
): Router => {
    const router = Router();

    // Регистрируем все роуты
    router.use('/auth', getAuthRoutes(authController));
    router.use('/training', getTrainingRoutes(trainingController));
    router.use('/weapon-types', getWeaponTypeRoutes(weaponTypeController));

    return router;
}; 
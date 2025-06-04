import { Router } from 'express';
import { WeaponTypeController } from '../controllers/weapon-type.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const getWeaponTypeRoutes = (weaponTypeController: WeaponTypeController): Router => {
    const router = Router();

    // Все роуты требуют аутентификации
    router.use(authMiddleware);

    router.get('/', weaponTypeController.getAllWeaponTypes);
    router.get('/:id', weaponTypeController.getWeaponTypeById);
    router.post('/', weaponTypeController.createWeaponType);
    router.put('/:id', weaponTypeController.updateWeaponType);
    router.delete('/:id', weaponTypeController.deleteWeaponType);

    return router;
}; 
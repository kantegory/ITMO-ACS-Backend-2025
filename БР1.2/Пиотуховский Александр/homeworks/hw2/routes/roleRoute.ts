import { Router } from 'express';
import * as roleController from '../controllers/roleController';

const router = Router();

router.get('/', roleController.listRolesController);
router.get('/:id', roleController.getRoleByIdController);
router.get('/name/:name', roleController.getRoleByNameController);
router.post('/', roleController.createRoleController);
router.put('/:id', roleController.updateRoleController);
router.delete('/:id', roleController.deleteRoleController);

export default router;
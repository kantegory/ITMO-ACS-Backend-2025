import { Router } from 'express';
import * as permissionController from '../controllers/permissionController';

const router = Router();

router.get('/', permissionController.listPermissionsController);
router.get('/:id', permissionController.getPermissionByIdController);
router.get('/action/:action', permissionController.getPermissionByActionController);
router.post('/', permissionController.createPermissionController);
router.put('/:id', permissionController.updatePermissionController);
router.delete('/:id', permissionController.deletePermissionController);

export default router;
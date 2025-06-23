import { Router } from 'express';
import { 
  getContracts, 
  getContractById, 
  createContract,
  updateContractStatus
} from '../controllers/contractController';

const router = Router();

// Contract routes
router.get('/', getContracts);
router.get('/:id', getContractById);
router.post('/', createContract);
router.patch('/:id/status', updateContractStatus);

export default router; 
import express from 'express';
import {
  createProgress,
  getProgress,
  updateProgress,
  deleteProgress,
  listProgress
} from '../controllers/userWorkoutProgressController';

const router = express.Router();

router.post('/progress', createProgress);
router.get('/progress/:id', getProgress);
router.put('/progress/:id', updateProgress);
router.delete('/progress/:id', deleteProgress);
router.get('/progress', listProgress);

export default router;

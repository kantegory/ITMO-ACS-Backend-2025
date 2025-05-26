import express from 'express';
import {
  createMeasurement,
  getMeasurement,
  updateMeasurement,
  deleteMeasurement,
  listMeasurements
} from '../controllers/userMeasurementsProgressController';

const router = express.Router();

router.post('/measurements', createMeasurement);
router.get('/measurements/:id', getMeasurement);
router.put('/measurements/:id', updateMeasurement);
router.delete('/measurements/:id', deleteMeasurement);
router.get('/measurements', listMeasurements);

export default router;

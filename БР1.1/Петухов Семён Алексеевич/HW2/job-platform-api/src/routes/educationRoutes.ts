import express from 'express';
import { createEducation, getEducations, getEducationById, updateEducation, deleteEducation } from '../controllers/educationController';

const router = express.Router();

// Роуты для работы с уровнями образования
router.post('/educations', createEducation); // создание уровня образования
router.get('/educations', getEducations); // получение всех уровней образования
router.get('/educations/:id', getEducationById); // получение уровня образования по ID
router.put('/educations/:id', updateEducation); // обновление уровня образования
router.delete('/educations/:id', deleteEducation); // удаление уровня образования

export default router;
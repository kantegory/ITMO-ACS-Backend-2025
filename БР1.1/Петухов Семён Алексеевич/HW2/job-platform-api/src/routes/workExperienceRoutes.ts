import express from 'express';
import { createWorkExperience, getWorkExperiences, getWorkExperienceById, updateWorkExperience, deleteWorkExperience } from '../controllers/workExperienceController';

const router = express.Router();

// Роуты для опыта работы
router.post('/workExperiences', createWorkExperience); // создание опыта работы
router.get('/workExperiences', getWorkExperiences); // получение всех опытов работы
router.get('/workExperiences/:id', getWorkExperienceById); // получение опыта работы по ID
router.put('/workExperiences/:id', updateWorkExperience); // обновление опыта работы
router.delete('/workExperiences/:id', deleteWorkExperience); // удаление опыта работы

export default router;

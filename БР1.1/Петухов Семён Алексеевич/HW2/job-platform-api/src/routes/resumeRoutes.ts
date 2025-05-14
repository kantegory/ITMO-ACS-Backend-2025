import express from 'express';
import { createResume, getResumes, getResumeById, updateResume, deleteResume } from '../controllers/resumeController';

const router = express.Router();

// Роуты для резюме
router.post('/resumes', createResume); // создание резюме
router.get('/resumes', getResumes); // получение всех резюме
router.get('/resumes/:id', getResumeById); // получение резюме по ID
router.put('/resumes/:id', updateResume); // обновление резюме
router.delete('/resumes/:id', deleteResume); // удаление резюме

export default router;

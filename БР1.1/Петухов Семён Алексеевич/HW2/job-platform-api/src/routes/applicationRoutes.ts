import express from 'express';
import { createApplication, getApplications, getApplicationById, updateApplication, deleteApplication } from '../controllers/applicationController';

const router = express.Router();

// Роуты для работы с заявками
router.post('/applications', createApplication); // создание заявки
router.get('/applications', getApplications); // получение всех заявок
router.get('/applications/:id', getApplicationById); // получение заявки по ID
router.put('/applications/:id', updateApplication); // обновление заявки
router.delete('/applications/:id', deleteApplication); // удаление заявки

export default router;
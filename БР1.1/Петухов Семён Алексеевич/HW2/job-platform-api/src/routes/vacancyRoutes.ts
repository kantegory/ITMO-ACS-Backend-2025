import express from 'express';
import { createVacancy, getVacancies, getVacancyById, updateVacancy, deleteVacancy } from '../controllers/vacancyController';

const router = express.Router();

// Роуты для работы с вакансиями
router.post('/vacancies', createVacancy); // создание вакансии
router.get('/vacancies', getVacancies); // получение всех вакансий
router.get('/vacancies/:id', getVacancyById); // получение вакансии по ID
router.put('/vacancies/:id', updateVacancy); // обновление вакансии
router.delete('/vacancies/:id', deleteVacancy); // удаление вакансии

export default router;
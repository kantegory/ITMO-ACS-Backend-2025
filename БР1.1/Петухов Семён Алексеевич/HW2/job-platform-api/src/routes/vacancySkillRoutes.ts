import express from 'express';
import { createVacancySkill, getVacancySkills, getVacancySkillById, deleteVacancySkill } from '../controllers/vacancySkillController';

const router = express.Router();

// Роуты для работы с связями вакансий и навыков
router.post('/vacancySkills', createVacancySkill); // создание связи между вакансией и навыком
router.get('/vacancySkills', getVacancySkills); // получение всех связей вакансий и навыков
router.get('/vacancySkills/:id', getVacancySkillById); // получение связи по ID
router.delete('/vacancySkills/:id', deleteVacancySkill); // удаление связи между вакансией и навыком

export default router;
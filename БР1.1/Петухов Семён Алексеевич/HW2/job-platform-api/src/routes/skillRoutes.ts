// src/routes/skillRoutes.ts
import express from 'express';
import { createSkill, getSkills, getSkillById, updateSkill, deleteSkill } from '../controllers/skillController';

const router = express.Router();

// Роуты для навыков
router.post('/skills', createSkill); // создание навыка
router.get('/skills', getSkills); // получение всех навыков
router.get('/skills/:id', getSkillById); // получение навыка по ID
router.put('/skills/:id', updateSkill); // обновление навыка
router.delete('/skills/:id', deleteSkill); // удаление навыка

export default router;

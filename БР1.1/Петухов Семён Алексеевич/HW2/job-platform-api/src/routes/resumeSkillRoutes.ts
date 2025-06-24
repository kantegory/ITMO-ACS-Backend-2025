import express from 'express';
import { addSkillToResume, getResumeSkills, getResumeSkillById, removeSkillFromResume } from '../controllers/resumeSkillController';

const router = express.Router();

// Роуты для работы с навыками в резюме
router.post('/resumeSkills', addSkillToResume); // добавление навыка в резюме
router.get('/resumeSkills', getResumeSkills); // получение всех связок резюме и навыков
router.get('/resumeSkills/:id', getResumeSkillById); // получение связки по ID
router.delete('/resumeSkills/:id', removeSkillFromResume); // удаление навыка из резюме

export default router;
import express from 'express';
import { createMotivationLetter, getMotivationLetters, getMotivationLetterById, updateMotivationLetter, deleteMotivationLetter } from '../controllers/motivationLetterController';

const router = express.Router();

// Роуты для работы с мотивационными письмами
router.post('/motivationLetters', createMotivationLetter); // создание мотивационного письма
router.get('/motivationLetters', getMotivationLetters); // получение всех мотивационных писем
router.get('/motivationLetters/:id', getMotivationLetterById); // получение мотивационного письма по ID
router.put('/motivationLetters/:id', updateMotivationLetter); // обновление мотивационного письма
router.delete('/motivationLetters/:id', deleteMotivationLetter); // удаление мотивационного письма

export default router;
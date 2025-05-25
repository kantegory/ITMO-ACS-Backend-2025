import express from 'express';
import { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } from '../controllers/companyController';

const router = express.Router();

// Роуты для работы с компаниями
router.post('/companies', createCompany); // создание компании
router.get('/companies', getCompanies); // получение всех компаний
router.get('/companies/:id', getCompanyById); // получение компании по ID
router.put('/companies/:id', updateCompany); // обновление компании
router.delete('/companies/:id', deleteCompany); // удаление компании

export default router;
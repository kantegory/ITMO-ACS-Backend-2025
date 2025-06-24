import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import resumeRoutes from './routes/resumeRoutes';
import workExperienceRoutes from './routes/workExperienceRoutes';
import skillRoutes from './routes/skillRoutes';
import resumeSkillRoutes from './routes/resumeSkillRoutes';
import educationRoutes from './routes/educationRoutes';
import companyRoutes from './routes/companyRoutes';
import vacancyRoutes from './routes/vacancyRoutes';
import vacancySkillRoutes from './routes/vacancySkillRoutes';
import applicationRoutes from './routes/applicationRoutes';
import motivationLetterRoutes from './routes/motivationLetterRoutes';

const app = express();
const port = 3000;

// Middleware для обработки JSON тела запроса
app.use(bodyParser.json());

// Подключение маршрутов
app.use('/api', userRoutes);
app.use('/api', resumeRoutes);
app.use('/api', workExperienceRoutes);
app.use('/api', skillRoutes);
app.use('/api', resumeSkillRoutes);
app.use('/api', educationRoutes);
app.use('/api', companyRoutes);
app.use('/api', vacancyRoutes);
app.use('/api', vacancySkillRoutes);
app.use('/api', applicationRoutes);
app.use('/api', motivationLetterRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
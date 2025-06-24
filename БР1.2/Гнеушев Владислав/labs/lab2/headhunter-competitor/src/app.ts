import 'reflect-metadata';
import express, { Express } from 'express';
import { myDataSource } from './config/data-source';
import { settings } from './config/settings';
import { requestLogger } from './middlewares/requestLogger';
import { globalErrorHandler } from './errors/globalErrorHandler';
import { setupSwagger } from './swagger';
import userRoutes from './routes/UserRoutes/UserRoutes';
import companyRoutes from './routes/CompanyRoutes/CompanyRoutes';
import jobCategoryRoutes from './routes/JobCategoryRoutes/JobCategoryRoutes';
import jobOfferRoutes from './routes/JobOfferRoutes/JobOfferRoutes';
import skillRoutes from './routes/SkillRoutes/SkillRoutes';
import resumeRoutes from './routes/ResumeRoutes/ResumeRoutes';
import employerCabinetRoutes from './routes/EmployerCabinetRoutes/EmployerCabinetRoutes';
import employeeCabinetRoutes from './routes/EmployeeCabinetRoutes/EmployeeCabinetRoutes';

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Swagger setup
setupSwagger(app);

// API Routes
app.use(settings.app.API_PREFIX + '/users', userRoutes);
app.use(settings.app.API_PREFIX + '/companies', companyRoutes);
app.use(settings.app.API_PREFIX + '/job-categories', jobCategoryRoutes);
app.use(settings.app.API_PREFIX + '/job-offers', jobOfferRoutes);
app.use(settings.app.API_PREFIX + '/skills', skillRoutes);
app.use(settings.app.API_PREFIX + '/resumes', resumeRoutes);
app.use(settings.app.API_PREFIX + '/employer-cabinets', employerCabinetRoutes);
app.use(settings.app.API_PREFIX + '/employee-cabinets', employeeCabinetRoutes);

app.use(globalErrorHandler);

const startServer = async () => {
    try {
        await myDataSource.initialize();
        console.log('Data Source has been initialized!');

        app.listen(settings.app.PORT, settings.app.HOST, () => {
            console.log(`Server is running on ${settings.app.PROTOCOL}://${settings.app.HOST}:${settings.app.PORT}${settings.app.API_PREFIX}`);
            console.log(`All manual routes registered.`);
            console.log(`Swagger UI available at /docs`);
        });
    } catch (error) {
        console.error('Error during server startup:', error);
        process.exit(1);
    }
};

startServer();
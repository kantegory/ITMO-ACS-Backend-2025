import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { applicationDataSource } from './config/data-source';
import { settings } from './config/settings';
import resumeRoutes from './routes/resumeRoutes';
import applicationRoutes from './routes/applicationRoutes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(settings.app.API_PREFIX + '/resumes', resumeRoutes);
app.use(settings.app.API_PREFIX + '/applications', applicationRoutes);

app.get('/health', (req, res) => {
    res.json({ 
        service: 'application-service',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    try {
        await applicationDataSource.initialize();
        console.log('Application Service Database connected!');

        app.listen(settings.app.PORT, settings.app.HOST, () => {
            console.log(`Application Service running on ${settings.app.PROTOCOL}://${settings.app.HOST}:${settings.app.PORT}${settings.app.API_PREFIX}`);
        });
    } catch (error) {
        console.error('Error during Application Service startup:', error);
        process.exit(1);
    }
};

startServer(); 
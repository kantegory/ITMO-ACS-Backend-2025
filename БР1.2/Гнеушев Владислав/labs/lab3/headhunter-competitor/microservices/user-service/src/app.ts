import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { userDataSource } from './config/data-source';
import { settings } from './config/settings';
import userRoutes from './routes/userRoutes';
import employeeCabinetRoutes from './routes/employeeCabinetRoutes';
import employerCabinetRoutes from './routes/employerCabinetRoutes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(settings.app.API_PREFIX + '/users', userRoutes);
app.use(settings.app.API_PREFIX + '/employee-cabinets', employeeCabinetRoutes);
app.use(settings.app.API_PREFIX + '/employer-cabinets', employerCabinetRoutes);

app.get('/health', (req, res) => {
    res.json({ 
        service: 'user-service',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    try {
        await userDataSource.initialize();
        console.log('User Service Database connected!');

        app.listen(settings.app.PORT, settings.app.HOST, () => {
            console.log(`User Service running on ${settings.app.PROTOCOL}://${settings.app.HOST}:${settings.app.PORT}${settings.app.API_PREFIX}`);
        });
    } catch (error) {
        console.error('Error during User Service startup:', error);
        process.exit(1);
    }
};

startServer(); 
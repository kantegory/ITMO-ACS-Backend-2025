import 'reflect-metadata';
import express, { Application } from 'express';
import { myDataSource } from './config/data-source';
import { settings } from './config/settings';
import userRoutes from './routes/UserRoutes/UserRoutes';
import { requestLogger } from './middlewares/requestLogger';
import { globalErrorHandler } from './errors/globalErrorHandler';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// API Routes
app.use(settings.app.API_PREFIX + '/users', userRoutes);

app.use(globalErrorHandler);

const startServer = async () => {
    try {
        await myDataSource.initialize();
        console.log('Data Source has been initialized!');

        app.listen(settings.app.PORT, settings.app.HOST, () => {
            console.log(`Server is running on ${settings.app.PROTOCOL}://${settings.app.HOST}:${settings.app.PORT}${settings.app.API_PREFIX}`);
        });
    } catch (error) {
        console.error('Error during server startup:', error);
        process.exit(1);
    }
};

startServer();
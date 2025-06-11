import 'reflect-metadata';
import express, { Express } from 'express';
import { jobDataSource } from './config/data-source';
import { settings } from './config/settings';
import { errorHandler } from './middlewares/errorHandler';

import jobOfferRoutes from './routes/jobOfferRoutes';
import companyRoutes from './routes/companyRoutes';
import jobCategoryRoutes from './routes/jobCategoryRoutes';
import skillRoutes from './routes/skillRoutes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(settings.app.API_PREFIX + '/job-offers', jobOfferRoutes);
app.use(settings.app.API_PREFIX + '/companies', companyRoutes);
app.use(settings.app.API_PREFIX + '/job-categories', jobCategoryRoutes);
app.use(settings.app.API_PREFIX + '/skills', skillRoutes);

app.get('/health', (req, res) => {
    res.json({ 
        service: 'job-service',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use(errorHandler);

const startServer = async () => {
    try {
        await jobDataSource.initialize();
        console.log('Job Service Database connected!');

        app.listen(settings.app.PORT, settings.app.HOST, () => {
            console.log(`Job Service running on ${settings.app.PROTOCOL}://${settings.app.HOST}:${settings.app.PORT}${settings.app.API_PREFIX}`);
            console.log('Available routes:');
            console.log(`  GET/POST    ${settings.app.API_PREFIX}/job-offers`);
            console.log(`  GET/PUT/DEL ${settings.app.API_PREFIX}/job-offers/:id`);
            console.log(`  GET/POST    ${settings.app.API_PREFIX}/companies`);
            console.log(`  GET/PUT/DEL ${settings.app.API_PREFIX}/companies/:id`);
            console.log(`  GET/POST    ${settings.app.API_PREFIX}/job-categories`);
            console.log(`  GET/PUT/DEL ${settings.app.API_PREFIX}/job-categories/:id`);
            console.log(`  GET/POST    ${settings.app.API_PREFIX}/skills`);
            console.log(`  GET/PUT/DEL ${settings.app.API_PREFIX}/skills/:id`);
        });
    } catch (error) {
        console.error('Error during Job Service startup:', error);
        process.exit(1);
    }
};

startServer(); 
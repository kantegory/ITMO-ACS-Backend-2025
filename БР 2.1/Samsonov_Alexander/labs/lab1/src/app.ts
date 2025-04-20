import express from 'express';
import router from './routes';
import {AppDataSource} from './data-source';

import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger';


const app = express();
app.use(express.json());

app.use('/api', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
    });
});

export default app;
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler';
import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import routes from './routes';

const app = express();


app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Rent A Property API Users Microservice',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [
    './src/routes/**/*.ts',
    './src/controllers/**/*.ts',
    './src/entities/**/*.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(errorHandler);

export default app;

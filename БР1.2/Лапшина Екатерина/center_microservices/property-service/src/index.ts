import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './config/database';
import propertyRoutes from './routes/properties';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Property Service API',
      version: '1.0.0',
      description: 'Property management microservice API',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/properties', propertyRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'property-service' });
});

// Internal API for service-to-service communication
app.post('/api/internal', (req, res) => {
  const { service, action, data } = req.body;
  
  // Handle internal service requests
  switch (action) {
    case 'getApartmentById':
      // Implementation for internal apartment lookup
      res.json({ success: true, data: null });
      break;
    case 'getBuildingById':
      // Implementation for internal building lookup
      res.json({ success: true, data: null });
      break;
    default:
      res.status(400).json({ success: false, error: 'Unknown action' });
  }
});

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Property service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  }); 
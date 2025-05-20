import swaggerJSDoc from 'swagger-jsdoc';
import { writeFileSync } from 'fs';
import { swaggerOptions } from './swagger';

const swaggerSpec = swaggerJSDoc(swaggerOptions);
writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));

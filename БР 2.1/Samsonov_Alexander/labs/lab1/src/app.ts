import express, { Application, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes';
import { ValidateError } from 'tsoa';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @ts-ignore
app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  // @ts-ignore
  return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
});

RegisterRoutes(app);

// @ts-ignore
app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Validation error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      details: err.message,
    });
  }

  next();
});

// 404 handler
app.use(function notFoundHandler(_req, res: Response) {
  res.status(404).send({
    message: 'Not Found',
  });
});

export default app;
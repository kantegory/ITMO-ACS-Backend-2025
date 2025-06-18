/// <reference path="./types/express/index.d.ts" />
import 'reflect-metadata';
import { AppDataSource } from './config/app-data-source';
import app from './app';

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
      console.log('Application is up and running');
    });
  })
  .catch((error) => console.error('Error during Data Source initialization', error));
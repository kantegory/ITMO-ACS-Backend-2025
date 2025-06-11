// src/data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

// Определяем, запущено ли приложение из dist/
const isCompiled = __dirname.includes('dist');

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [
    isCompiled
      ? join(__dirname, '**', '*.entity.js')
      : join(__dirname, '**', '*.entity.ts'),
  ],

  migrations: [
    isCompiled
      ? join(__dirname, 'migration', '*.js')
      : join(__dirname, 'migration', '*.ts'),
  ],

  synchronize: false,
  migrationsRun: true,
};

export default new DataSource(options);

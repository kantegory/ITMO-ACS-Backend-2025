import { DataSource } from 'typeorm';
import 'dotenv/config'; // Загрузка переменных окружения

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any, // Приведение типа, так как process.env возвращает string | undefined
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10), // Преобразование в число с дефолтным значением
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/entities/*.ts'],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
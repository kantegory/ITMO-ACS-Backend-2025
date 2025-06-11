import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): { database: TypeOrmModuleOptions } => ({
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../migration/*.{ts,js}'],
    synchronize: false,
    migrationsRun: true,
  },
});

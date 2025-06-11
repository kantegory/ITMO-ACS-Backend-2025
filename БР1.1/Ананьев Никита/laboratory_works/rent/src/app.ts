import 'reflect-metadata';
import express from 'express';
import { useSwagger } from './swagger';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { createExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { InitializeDatabase } from './appDataSource';
import { Rent } from './models/RentModel';
import { Property } from './models/PropertyModel';
import { PropertyController } from './controllers/PropertyController';
import { RentController } from './controllers/RentController';
import { UserChecker } from './middlewares/AuthMiddleware';
import './services/PropertyService';
import './services/RentService';

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class App {
    private app!: express.Express

    async init () {
        routingUseContainer(Container);
        await this.setupDatabase();

        const options = {
            controllers: [RentController, PropertyController],
            currentUserChecker: UserChecker,
            validation: true,
            classTransformer: true,
            defaultErrorHandler: true,
        };

        let exprServ = createExpressServer(options);
        exprServ.use(express.json());
        this.app = useSwagger(exprServ, options);
    }

    private async setupDatabase() {
        try {
            await sleep(2000);
            const AppDataSource = await InitializeDatabase();
            await sleep(5000);

            const dbName = await AppDataSource.query("SELECT current_database()");
            console.log("1. Current DB:", dbName);

            console.log("2. Entities:", 
            AppDataSource.entityMetadatas.map(e => e.name));

            const tables = await AppDataSource.query(`
                SELECT table_name FROM information_schema.tables 
                WHERE table_schema = 'public'
            `);
            console.log('3. DB Tables:', tables);
            
            Container.set('rent.repository', AppDataSource.getRepository(Rent));
            Container.set('property.repository', AppDataSource.getRepository(Property));
            console.log("Data Source has been initialized!");
        } catch (error) {
            console.error("Error during initialization:", error);
            process.exit(1); 
        }
    }

    public listen(port: number) {
        this.app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
    }
}

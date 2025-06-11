import 'reflect-metadata';
import express from 'express';
import { useSwagger } from './swagger';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { createExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { InitializeDatabase } from './appDataSource';
import { Message } from './models/MessageModel';
import { MessageController } from './controllers/MessageController';
import './services/MessageService';

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class App {
    private app!: express.Express
    async init () {
        routingUseContainer(Container);
        
        await this.setupDatabase();

        console.log('Has IMessageService:', Container.has('IMessageService'));

        const options = {
            controllers: [MessageController],
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
            const appDataSource = await InitializeDatabase();
            await sleep(5000);

            const dbName = await appDataSource.query("SELECT current_database()");
            console.log("1. Current DB:", dbName);

            console.log("2. Entities:", 
            appDataSource.entityMetadatas.map(e => e.name));

            const tables = await appDataSource.query(`
                SELECT table_name FROM information_schema.tables 
                WHERE table_schema = 'public'
            `);
            console.log('3. DB Tables:', tables);
            
            Container.set('message.repository', appDataSource.getRepository(Message));
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

import 'reflect-metadata';
import express from 'express';
import { useSwagger } from './swagger';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { createExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { UserHandler } from './handlers/UserHandler';
import { AppDataSource } from './appDataSource';
import { User } from './models/UserModel';
import { Rent } from './models/RentModel';
import { Message } from './models/MessageModel';
import { Property } from './models/PropertyModel';
import { RentHandler } from './handlers/RentHandler';
import { PropertyHandler } from './handlers/PropertyHandler';
import { MessageHandler } from './handlers/MessageHandler';

export class App {
    private app: express.Express

    constructor() {
        routingUseContainer(Container);
        AppDataSource
            .initialize()
            .then(() => {
                Container.set('message.repository', AppDataSource.getRepository(Message));
                Container.set('property.repository', AppDataSource.getRepository(Property));
                Container.set('rent.repository', AppDataSource.getRepository(Rent));
                Container.set('user.repository', AppDataSource.getRepository(User));
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })

        const options = {
            controllers: [UserHandler, RentHandler, PropertyHandler, MessageHandler],
            validation: true,
            classTransformer: true,
            defaultErrorHandler: true,
        };

        
        let expr_serv = createExpressServer(options);
        expr_serv.use(express.json());
        this.app = useSwagger(expr_serv, options);
    }

    public listen(port: number) {
        this.app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
    }
}

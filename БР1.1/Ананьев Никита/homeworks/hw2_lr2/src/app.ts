import express from 'express';
import { User } from './models/UserModel';
import { UserHandler } from './handlers/UserHandler';
import { UserService } from './services/UserService';
import { AppDataSource } from './appDataSource';
import { RentService } from './services/RentService';
import { Rent } from './models/RentModel';
import { RentHandler } from './handlers/RentHandler';
import { PropertyService } from './services/PropertyService';
import { Property } from './models/PropertyModel';
import { PropertyHandler } from './handlers/PropertyHandler';
import { Message } from './models/MessageModel';
import { MessageService } from './services/MessageService';
import { MessageHandler } from './handlers/MessageHandler';

export class App {
    private readonly app: express.Application

    constructor() {
        AppDataSource
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })
        this.app = express()
        this.app.use(express.json());
        this.initHandlers()
    }

    private initHandlers() {
        const userService = new UserService(AppDataSource.getRepository(User))
        const userHandler = new UserHandler(userService)

        const propertyService = new PropertyService(AppDataSource.getRepository(Property))
        const propertyHandler = new PropertyHandler(propertyService)
    
        const rentService = new RentService(AppDataSource.getRepository(Rent))
        const rentHandler = new RentHandler(rentService)

        const messageService = new MessageService(AppDataSource.getRepository(Message))
        const messageHandler = new MessageHandler(messageService)

        this.app.use("/users", userHandler.router)
        this.app.use("/properties", propertyHandler.router)
        this.app.use("/rents", rentHandler.router)
        this.app.use("/messages", messageHandler.router)
    }

    public listen(port: number) {
        this.app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
    }
}

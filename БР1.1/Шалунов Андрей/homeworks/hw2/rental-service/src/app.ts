import express, { Request, Response } from "express";
import { dataSource } from "./DataSource";
import userRoutes from './routes/UserRouter';
import propertyRoutes from './routes/PropertyRouter';
import photoRoutes    from './routes/PhotoRouter';
import bookingRoutes  from './routes/BookingRouter';
import messageRoutes  from './routes/MessageRouter';



dataSource.initialize()
    .then(() => {
        const app = express();
        app.use(express.json());

        app.use('/users', userRoutes);
        app.use('/properties', propertyRoutes);
        app.use('/photos', photoRoutes);
        app.use('/bookings', bookingRoutes);
        app.use('/messages', messageRoutes);

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    })
    .catch(error => console.error('Data Source error:', error));
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import { Property } from './models/Property';
import { PropertyPhoto } from './models/PropertyPhoto';
import { Booking } from './models/Booking';
import { Message } from './models/Message';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        User, 
        Property, 
        PropertyPhoto, 
        Booking, 
        Message
    ],
});
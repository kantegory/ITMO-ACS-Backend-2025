import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entities/User";
import { Property } from "./entities/Property";
import { Rental } from "./entities/Rental";
import { Message } from "./entities/Message";
import { Favorite } from "./entities/Favorite";
import { BookingRequest } from "./entities/BookingRequest";
import { Review } from "./entities/Review";
import { Transaction } from "./entities/Transaction";
import { Complaint } from "./entities/Complaint";
import { PropertyImage } from "./entities/PropertyImage";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [
    User,
    Property,
    Rental,
    Message,
    Favorite,
    BookingRequest,
    Review,
    Transaction,
    Complaint,
    PropertyImage,
  ],
});

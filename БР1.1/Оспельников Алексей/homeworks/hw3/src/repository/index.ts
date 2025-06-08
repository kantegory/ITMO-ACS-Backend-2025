//repository/index.ts
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Message } from "../entity/Message";
import { Rent } from "../entity/Rent";
import { Property } from "../entity/Property";
import { Review } from "../entity/Review";

import { UserService } from "../service/UserService";
import { MessageService } from "../service/MessageService";
import { RentService } from "../service/RentService";
import { ReviewService } from "../service/ReviewService";
import { PropertyService } from "../service/PropertyService";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);

export const messageRepository = new MessageService(
  AppDataSource.getRepository(Message)
);

export const propertyRepository = new PropertyService(
  AppDataSource.getRepository(Property)
);

export const reviewRepository = new ReviewService(
  AppDataSource.getRepository(Review)
);

export const rentRepository = new RentService(
  AppDataSource.getRepository(Rent)
);



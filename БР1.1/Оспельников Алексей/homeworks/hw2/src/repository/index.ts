
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserService } from "../service/userService";

import { Message } from "../entity/Message";
import { MessageService } from "../service/messageService";

import { Property } from "../entity/Property";
import { PropertyService } from "../service/propertyService";

import { Review } from "../entity/Review";
import { ReviewService } from "../service/reviewService";

import { Rent } from "../entity/Rent";
import { RentService } from "../service/rentService";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);

export const propertyRepository = new PropertyService(
  AppDataSource.getRepository(Property)
);

export const messageRepository = new MessageService(
  AppDataSource.getRepository(Message)
);

export const rentRepository = new RentService(
  AppDataSource.getRepository(Rent)
);

export const reviewRepository = new ReviewService(
  AppDataSource.getRepository(Review)
);


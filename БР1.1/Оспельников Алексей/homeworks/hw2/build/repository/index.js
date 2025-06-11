"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentRepository = exports.reviewRepository = exports.propertyRepository = exports.messageRepository = exports.userRepository = void 0;
//repository/index.ts
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const Message_1 = require("../entity/Message");
const Rent_1 = require("../entity/Rent");
const Property_1 = require("../entity/Property");
const Review_1 = require("../entity/Review");
const UserService_1 = require("../service/UserService");
const MessageService_1 = require("../service/MessageService");
const RentService_1 = require("../service/RentService");
const ReviewService_1 = require("../service/ReviewService");
const PropertyService_1 = require("../service/PropertyService");
exports.userRepository = new UserService_1.UserService(data_source_1.AppDataSource.getRepository(User_1.User));
exports.messageRepository = new MessageService_1.MessageService(data_source_1.AppDataSource.getRepository(Message_1.Message));
exports.propertyRepository = new PropertyService_1.PropertyService(data_source_1.AppDataSource.getRepository(Property_1.Property));
exports.reviewRepository = new ReviewService_1.ReviewService(data_source_1.AppDataSource.getRepository(Review_1.Review));
exports.rentRepository = new RentService_1.RentService(data_source_1.AppDataSource.getRepository(Rent_1.Rent));
//# sourceMappingURL=index.js.map
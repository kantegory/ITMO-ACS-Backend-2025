import { AppDataSource } from "../data-source";
import { BookingRequest } from "../entities/BookingRequest";
import { BaseController } from "./BaseController";

export const bookingRequestController = new BaseController<BookingRequest>(AppDataSource.getRepository(BookingRequest));
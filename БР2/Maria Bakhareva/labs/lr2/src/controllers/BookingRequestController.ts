import { AppDataSource } from '../config/databaseConfig';
import { BookingRequest } from '../entities/BookingRequest';
import { UserRole } from '../entities/User';
import { BaseController } from './BaseController';

export const BookingRequestController = new BaseController<BookingRequest>(
  AppDataSource.getRepository(BookingRequest),
);

BookingRequestController.getAll = async (req, res) => {
  try {
    if (req.payload) {
      const role = req.payload.role;
      const userId = req.payload.userId;
      if (role === UserRole.ADMIN) {
        const bookingRequests =
          await BookingRequestController.repository.find();
        res.json(bookingRequests);
        return;
      } else if (role === UserRole.LANDLORD) {
        const bookingRequests = await BookingRequestController.repository
          .createQueryBuilder('booking_request')
          .leftJoinAndSelect('booking_request.property', 'property')
          .where('property.owner_id = :userId', { userId })
          .getMany();
        res.json(bookingRequests);
        return;
      } else if (role === UserRole.TENANT) {
        const bookingRequests = await BookingRequestController.repository.find({
          where: { tenant: { id: userId } },
        });
        res.json(bookingRequests);
        return;
      }
    }
    res.status(403).json({ message: 'Forbidden' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

BookingRequestController.getById = async (req, res) => {
  try {
    if (req.payload) {
      const role = req.payload.role;
      const userId = req.payload.userId;
      const bookingRequestId = parseInt(req.params.id, 10);
      if (role === UserRole.ADMIN) {
        const bookingRequest =
          await BookingRequestController.repository.findOne({
            where: { id: bookingRequestId },
          });
        res.json(bookingRequest);
        return;
      } else if (role === UserRole.LANDLORD) {
        const bookingRequest = await BookingRequestController.repository
          .createQueryBuilder('booking_request')
          .leftJoinAndSelect('booking_request.property', 'property')
          .where('property.owner_id = :userId', { userId })
          .andWhere('booking_request.id = :bookingRequestId', {
            bookingRequestId,
          })
          .getOne();
        res.json(bookingRequest);
        return;
      } else if (role === UserRole.TENANT) {
        const bookingRequest =
          await BookingRequestController.repository.findOne({
            where: { id: bookingRequestId, tenant: { id: userId } },
          });
        res.json(bookingRequest);
        return;
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

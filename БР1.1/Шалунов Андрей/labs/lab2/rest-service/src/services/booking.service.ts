import { AppDataSource } from '../config/data-source';
import { Booking } from '../models/booking.entity';
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto';

const bookingRepo = AppDataSource.getRepository(Booking);

export class BookingService {
    static createBooking(dto: CreateBookingDto) {
        const entity = bookingRepo.create({
            property: { property_id: dto.property_id } as any,
            renter:   { user_id: dto.renter_id } as any,
            start_at: new Date(dto.start_at),
            end_at:   new Date(dto.end_at),
            total_price: dto.total_price,
            deal_status: dto.deal_status,
        });
        return bookingRepo.save(entity);
    }

    static getAllBookings() {
        return bookingRepo.find({ relations: ['property', 'renter'] });
    }

    static getBookingById(id: number) {
        return bookingRepo.findOne({
            where: { booking_id: id },
            relations: ['property', 'renter'],
        });
    }

    static async updateBooking(id: number, dto: UpdateBookingDto) {
        await bookingRepo.update({ booking_id: id }, dto);
        return this.getBookingById(id);
    }

    static deleteBooking(id: number) {
        return bookingRepo.delete({ booking_id: id });
    }
}
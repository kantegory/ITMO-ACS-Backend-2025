import { dataSource } from '../DataSource';
import { Booking } from '../models/Booking';
import { CreateBookingDto, UpdateBookingDto } from '../dto/BookingDto';

const repo = dataSource.getRepository(Booking);

export const createBooking = async (dto: CreateBookingDto) => {
    const { property_id, renter_id, ...rest } = dto;
    const entity = repo.create({
        ...rest,
        property: { property_id } as any,
        renter:   { user_id: renter_id } as any,
    });
    return repo.save(entity);
};

export const getAllBookings = () =>
    repo.find({ relations: ['property', 'renter'] });

export const getBookingById = (id: number) =>
    repo.findOne({
        where: { booking_id: id },
        relations: ['property', 'renter'],
    });

export const updateBooking = async (id: number, dto: UpdateBookingDto) => {
    await repo.update({ booking_id: id }, dto);
    return getBookingById(id);
};

export const deleteBooking = (id: number) =>
    repo.delete({ booking_id: id });
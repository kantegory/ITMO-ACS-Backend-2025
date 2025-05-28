import { AppDataSource } from '../config/data-source'
import { Booking } from '../models/booking.entity'
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto'
import { fetchUser } from '../clients/user.client'
import { fetchProperty } from '../clients/property.client'
import { User } from '../models/user.entity'
import { Property } from '../models/property.entity'
import { NotFoundError } from 'routing-controllers'

const bookingRepo = AppDataSource.getRepository(Booking)
const userRepo = AppDataSource.getRepository(User)
const propertyRepo = AppDataSource.getRepository(Property)

export class BookingService {
    static async createBooking(dto: CreateBookingDto, authHeader?: string) {
        const remoteUser = await fetchUser(dto.renter_id, authHeader)
        let localUser = await userRepo.findOneBy({ user_id: dto.renter_id })
        if (!localUser) {
            localUser = userRepo.create({
                user_id: dto.renter_id,
                name: remoteUser.name,
                email: remoteUser.email,
                phone: remoteUser.phone ?? null
            })
            await userRepo.save(localUser)
        }

        const remoteProp = await fetchProperty(dto.property_id, authHeader)
        let localProp = await propertyRepo.findOneBy({ property_id: dto.property_id })
        if (!localProp) {
            localProp = propertyRepo.create({
                property_id: dto.property_id,
                type: remoteProp.type,
                title: remoteProp.title,
                description: remoteProp.description,
                location: remoteProp.location,
                price_per_day: remoteProp.price_per_day,
                status: remoteProp.status
            })
            await propertyRepo.save(localProp)
        }

        const booking = bookingRepo.create({
            property: localProp,
            renter: localUser,
            start_at: new Date(dto.start_at),
            end_at: new Date(dto.end_at),
            total_price: dto.total_price,
            deal_status: dto.deal_status
        })
        return bookingRepo.save(booking)
    }

    static getAllBookings() {
        return bookingRepo.find({ relations: ['property', 'renter'] })
    }

    static async getBookingById(id: number) {
        const b = await bookingRepo.findOne({
            where: { booking_id: id },
            relations: ['property', 'renter']
        })
        if (!b) throw new NotFoundError('Booking not found')
        return b
    }

    static async updateBooking(id: number, dto: UpdateBookingDto) {
        await bookingRepo.update({ booking_id: id }, dto)
        return this.getBookingById(id)
    }

    static async deleteBooking(id: number) {
        const result = await bookingRepo.delete({ booking_id: id })
        if (result.affected === 0) throw new NotFoundError('Booking not found')
    }
}
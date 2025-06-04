import { AppDataSource } from '../config/database';
import { Booking } from '../entities/Booking';
import { userClient } from './userClient';
import { travelClient } from './travelClient';

export class BookingService {
    private static repo = AppDataSource.getRepository(Booking);

    static async create(data: {
        user_id: number;
        trip_id: number;
        participants_count: number;
    }): Promise<Booking> {
        await Promise.all([
            userClient.getUserById(data.user_id),
            travelClient.getTripById(data.trip_id)
        ]);

        const booking = this.repo.create(data);
        return await this.repo.save(booking);
    }

    static async getAll(): Promise<Booking[]> {
        return await this.repo.find();
    }

    static async getById(id: number): Promise<Booking | null> {
        return await this.repo.findOneBy({ booking_id: id });
    }

    static async update(
        id: number, 
        updates: Partial<Omit<Booking, 'booking_id'>>
    ): Promise<Booking> {
        const booking = await this.getById(id);
        if (!booking) throw new Error('Booking not found');

        if (updates.trip_id) {
            await travelClient.getTripById(updates.trip_id);
        }

        Object.assign(booking, updates);
        return await this.repo.save(booking);
    }

    static async delete(id: number): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) throw new Error('Booking not found');
    }
}
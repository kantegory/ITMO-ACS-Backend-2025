import { EntityRepository, Repository, Between } from 'typeorm';
import { Room } from '../models/room';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
    async createRoom(roomData: Partial<Room>): Promise<Room> {
        const room = this.create(roomData);
        return this.save(room);
    }

    async findWithFilters(filters: {
        floor?: number;
        beds?: number;
        minArea?: number;
        maxArea?: number;
        busy_beds?: number;
        hostelId?: number;
    }): Promise<Room[]> {
        return this.find({
            where: {
                floor: filters.floor,
                beds: filters.beds,
                area: filters.minArea && filters.maxArea
                    ? Between(filters.minArea, filters.maxArea)
                    : undefined,
                busy_beds: filters.busy_beds,
                hostel: { id: filters.hostelId },
            },
            relations: ['hostel', 'checkIns'],
        });
    }

    async findById(id: number): Promise<Room | undefined> {
        return this.findOne({
            where: { id },
            relations: ['hostel', 'checkIns']
        });
    }

    async updateRoom(id: number, updateData: Partial<Room>): Promise<Room | undefined> {
        await this.update(id, updateData);
        return this.findOne({ where: { id } });
    }

    async deleteRoom(id: number): Promise<void> {
        await this.delete(id);
    }
}
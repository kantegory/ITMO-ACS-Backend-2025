import dataSource from '../config/data-source';
import {RoomEntity} from '../models/room.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';

class RoomService {
    private repository = dataSource.getRepository(RoomEntity);

    async getById(id: number) {
        const room = await this.repository.findOne({
            where: {id},
            relations: ['living'],
        });
        if (!room) throw new EntityNotFoundError(RoomEntity, id, "id");
        return room;
    }

    async create(data: Partial<RoomEntity>) {
        const room = this.repository.create({
            locatedIn: data.locatedIn,
            roomType: data.roomType,
            living: data.living,
        });

        return await this.repository.save(room);
    }

    async update(id: number, data: Partial<RoomEntity>) {
        await this.getById(id);
        return await this.repository.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        return await this.repository.delete(id);
    }
}

export default new RoomService();

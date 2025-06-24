import AppDataSource from "../config/AppDataSource";
import { RoomEntity } from "../entities/room";
import { LivingEntity } from "../entities/living";
import EntityNotFoundError from "../errors/entity-not-found";

class RoomService {
    private roomRepo = AppDataSource.getRepository(RoomEntity);

    async createRoom(data: Partial<RoomEntity>) {
        const room = this.roomRepo.create(data);
        return await this.roomRepo.save(room);
    }

    async getRooms() {
        return await this.roomRepo.find();
    }

    async getRoomById(id: number) {
        const room = await this.roomRepo.findOne({ where: { id } });
        if (!room) {
            throw new EntityNotFoundError(RoomEntity, id, "id");
        }
        return room;
    }

    async updateRoom(id: number, data: Partial<RoomEntity>) {
        const room = await this.roomRepo.findOne({ where: { id } });
        if (!room) {
            throw new EntityNotFoundError(RoomEntity, id, "id");
        }
        Object.assign(room, data);
        return await this.roomRepo.save(room);
    }

    async deleteRoom(id: number) {
        const result = await this.roomRepo.delete(id);
        if (result.affected === 0) {
            throw new EntityNotFoundError(RoomEntity, id, "id");
        }
        return { message: `Room with id ${id} deleted successfully` };
    }
}

export default new RoomService();

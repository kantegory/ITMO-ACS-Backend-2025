import dataSource from '../config/data-source';
import EntityNotFoundError from '../errors/entity-not-found.error';
import {RoomEntity} from "../entities/room.entity";
import {LivingEntity} from "../entities/living.entity";
import {CreateRoomModel} from "../models/requests/room/room-create-request.model";

class RoomService {
    private repository = dataSource.getRepository(RoomEntity);

    async create(living: LivingEntity, model: CreateRoomModel): Promise<void> {
        const room = this.repository.create({
            living,
            ...model,
        });
        await room.save();
    }
}

export default new RoomService();

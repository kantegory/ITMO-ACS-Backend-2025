import {RoomEntity} from "../entities/room.entity";
import {Room} from "../models/models/room.model";
import {RoomResponseDto} from "../models/responses/room-response.dto";
import {CreateRoomRequestDto} from "../models/requests/room/room-create-request.dto";
import {CreateRoomModel} from "../models/requests/room/room-create-request.model";

export function entityToRoom(entity: RoomEntity): Room {
    return {
        id: entity.id,
        locatedIn: entity.locatedIn,
        roomType: entity.roomType,
        living: { id: entity.living.id } as any,
    };
}

export function toRoomResponseModel(room: Room): RoomResponseDto {
    return {
        locatedIn: room.locatedIn,
        roomType: room.roomType,
    };
}

export function createRoomDtoToModel(dto: CreateRoomRequestDto): CreateRoomModel {
    return {
        locatedIn: dto.locatedIn,
        roomType: dto.roomType,
    };
}

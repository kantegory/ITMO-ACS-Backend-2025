import { DishType } from '../models/DishType';
import { DishTypeResponseDTO } from '../dtos/dishType.dto';

export function toDishTypeResponseDTO(dt: DishType): DishTypeResponseDTO {
    return {
        id: dt.id,
        title: dt.title,
    };
}
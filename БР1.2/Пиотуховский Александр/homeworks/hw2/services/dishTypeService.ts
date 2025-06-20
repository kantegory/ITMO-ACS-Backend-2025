import { AppDataSource } from '../config/data-source';
import { DishType } from '../models/DishType';
import { CreateDishTypeDTO, UpdateDishTypeDTO } from '../dtos/dishType.dto';

const dishTypeRepository = AppDataSource.getRepository(DishType);

export async function getAllDishTypes(): Promise<DishType[]> {
    return dishTypeRepository.find();
}

export async function getDishTypeById(id: string): Promise<DishType | null> {
    return dishTypeRepository.findOne({ where: { id } });
}

export async function createDishType(
    data: CreateDishTypeDTO
): Promise<DishType> {
    const existing = await dishTypeRepository.findOne({ where: { id: data.id } });
    if (existing) {
        throw new Error('DishType already exists');
    }
    const dt = dishTypeRepository.create({ id: data.id, title: data.title });
    return dishTypeRepository.save(dt);
}

export async function updateDishType(
    id: string,
    updates: UpdateDishTypeDTO
): Promise<DishType | null> {
    const dt = await dishTypeRepository.findOne({ where: { id } });
    if (!dt) return null;
    if (updates.title !== undefined) dt.title = updates.title;
    return dishTypeRepository.save(dt);
}

export async function deleteDishType(id: string): Promise<boolean> {
    const res = await dishTypeRepository.delete(id);
    return (res.affected ?? 0) > 0;
}

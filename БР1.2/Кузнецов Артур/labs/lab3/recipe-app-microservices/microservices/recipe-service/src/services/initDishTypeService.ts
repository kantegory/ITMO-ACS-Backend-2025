import { AppDataSource } from '../config/database';
import { DishType } from '../models/DishType';

export const initializeDishTypes = async () => {
    const dishTypeRepo = AppDataSource.getRepository(DishType);

    const dishTypes = ['Закуски', 'Первые блюда', 'Вторые блюда', 'Салаты', 'Десерты', 'Напитки'];
    const existingDishTypes = await dishTypeRepo.find();
    const missingDishTypes = dishTypes.filter(
        name => !existingDishTypes.some(dt => dt.name === name),
    );

    if (missingDishTypes.length > 0) {
        const newDishTypes = missingDishTypes.map(name => {
            const type = new DishType();
            type.name = name;
            return type;
        });
        await dishTypeRepo.save(newDishTypes);
        console.log(`Initialized dish types: ${missingDishTypes.join(', ')}`);
    } else {
        console.log('Dish types already initialized.');
    }
};

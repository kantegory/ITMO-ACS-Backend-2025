import { AppDataSource } from '../config/database';
import { RecipeDifficulty } from '../models/RecipeDifficulty';

export const initializeRecipeDifficulties = async () => {
    const difficultyRepo = AppDataSource.getRepository(RecipeDifficulty);

    const difficulties = ['Легко', 'Нормально', 'Сложно'];
    const existingDifficulties = await difficultyRepo.find();
    const missingDifficulties = difficulties.filter(
        name => !existingDifficulties.some(d => d.name === name),
    );

    if (missingDifficulties.length > 0) {
        const newDifficulties = missingDifficulties.map(name => {
            const diff = new RecipeDifficulty();
            diff.name = name;
            return diff;
        });
        await difficultyRepo.save(newDifficulties);
        console.log(`Initialized difficulties: ${missingDifficulties.join(', ')}`);
    } else {
        console.log('Difficulties already initialized.');
    }
};

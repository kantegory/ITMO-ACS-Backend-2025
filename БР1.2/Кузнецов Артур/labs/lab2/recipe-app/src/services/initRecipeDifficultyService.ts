import { AppDataSource } from '../config/database';
import { RecipeDifficulty } from '../models/RecipeDifficulty';

export const initializeRecipeDifficulties = async () => {
    const difficultyRepo = AppDataSource.getRepository(RecipeDifficulty);

    const difficulties = ['Легко', 'Нормально', 'Сложно'];
    const existingDifficulties = await difficultyRepo.find();
    const missingDifficulties = difficulties.filter(
        level => !existingDifficulties.some(d => d.level === level),
    );

    if (missingDifficulties.length > 0) {
        const newDifficulties = missingDifficulties.map(level => {
            const diff = new RecipeDifficulty();
            diff.level = level;
            return diff;
        });
        await difficultyRepo.save(newDifficulties);
        console.log(`Initialized difficulties: ${missingDifficulties.join(', ')}`);
    } else {
        console.log('Difficulties already initialized.');
    }
};

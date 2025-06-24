import { AppDataSource } from '../config/database';
import { Ingredient } from '../models/Ingredient';

export const initializeIngredients = async () => {
    const ingredientRepo = AppDataSource.getRepository(Ingredient);

    const ingredients = [
        'Соль', 'Сахар', 'Перец черный', 'Мука пшеничная', 'Яйцо куриное', 'Молоко', 'Масло растительное',
        'Масло сливочное', 'Курица', 'Говядина', 'Свинина', 'Рыба', 'Лук репчатый', 'Чеснок', 'Помидор',
        'Огурец', 'Морковь', 'Картофель', 'Капуста', 'Перец болгарский', 'Фасоль', 'Горошек зелёный',
        'Кукуруза консервированная', 'Макароны', 'Рис', 'Гречка', 'Сметана', 'Майонез', 'Томатная паста',
        'Сыр твёрдый', 'Колбаса', 'Хлеб', 'Булгур', 'Йогурт', 'Лимон', 'Укроп', 'Петрушка', 'Базилик',
        'Орегано', 'Корица', 'Ваниль', 'Мёд', 'Грибы', 'Куриные бедра', 'Филе куриное', 'Креветки',
        'Оливковое масло', 'Соевый соус', 'Кетчуп', 'Миндаль',
    ];

    const existing = await ingredientRepo.find();
    const missing = ingredients.filter(
        name => !existing.some(ing => ing.name.toLowerCase() === name.toLowerCase()),
    );

    if (missing.length > 0) {
        const toSave = missing.map(name => {
            const ingredient = new Ingredient();
            ingredient.name = name;
            return ingredient;
        });

        await ingredientRepo.save(toSave);
        console.log(`Initialized ingredients: ${missing.join(', ')}`);
    } else {
        console.log('Ingredients already initialized.');
    }
};

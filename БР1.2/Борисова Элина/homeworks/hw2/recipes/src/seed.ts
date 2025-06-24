import { AppDataSource } from "./dataSource";
import { User } from "./entities/User";
import { Recipe } from "./entities/Recipe";
import { Ingredient } from "./entities/Ingredient";
import { RecipeIngredient } from "./entities/RecipeIngredient";

async function seedDatabase() {
    await AppDataSource.initialize();

    const user1 = new User();
    user1.username = "chef_john";
    user1.email = "john@example.com";
    user1.password_hash = "hashed_password_123";

    const user2 = new User();
    user2.username = "baker_mary";
    user2.email = "mary@example.com";
    user2.password_hash = "hashed_password_456";

    await AppDataSource.manager.save([user1, user2]);

    const flour = new Ingredient();
    flour.name = "Мука";

    const sugar = new Ingredient();
    sugar.name = "Сахар";

    await AppDataSource.manager.save([flour, sugar]);

    const cake = new Recipe();
    cake.title = "Шоколадный торт";
    cake.description = "Простейший рецепт торта";
    cake.difficulty = 3;
    cake.user = user1;

    await AppDataSource.manager.save(cake);

    const ri1 = new RecipeIngredient();
    ri1.recipe = cake;
    ri1.ingredient = flour;
    ri1.quantity = "300 г";

    const ri2 = new RecipeIngredient();
    ri2.recipe = cake;
    ri2.ingredient = sugar;
    ri2.quantity = "200 г";

    await AppDataSource.manager.save([ri1, ri2]);

    console.log("База данных успешно заполнена!");
    process.exit(0);
}

seedDatabase().catch(error => {
    console.error("Ошибка при заполнении базы:", error);
    process.exit(1);
});
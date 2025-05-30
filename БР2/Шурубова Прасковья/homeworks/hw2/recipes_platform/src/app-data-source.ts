import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from "./entities/User";
import { Article } from "./entities/Article";
import { Collection } from "./entities/Collection";
import { Recipe } from "./entities/Recipe";
import { Comment } from "./entities/Comment";
import { Rating } from "./entities/Rating";
import { Favourite } from "./entities/Favourite";
import { Category } from "./entities/Category";
import { File } from "./entities/File";


export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as 'postgres' | 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    entities: [
        User,
        Article,
        Recipe,
        Category,
        Comment,
        Favourite,
        File,
        Rating,
        Collection
    ],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});
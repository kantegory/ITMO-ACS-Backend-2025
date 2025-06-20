import { env } from 'process';
import dotenv from 'dotenv';
dotenv.config();

class Settings {
// db connection settings
    JWT_SECRET_KEY = env.JWT_SECRET_KEY
    JWT_ACCESS_TOKEN_LIFETIME = parseInt(env.JWT_ACCESS_TOKEN_LIFETIME)
}
    
const SETTINGS = new Settings();

export default SETTINGS
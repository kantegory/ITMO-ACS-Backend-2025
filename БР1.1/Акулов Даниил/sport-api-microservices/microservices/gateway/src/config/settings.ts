import 'dotenv/config'

class Settings {
    API_PORT = parseInt(process.env.API_PORT ?? '') || 8000;
    API_USER_PORT = parseInt(process.env.API_USER_PORT ?? '') || 8000;
    API_WORKOUT_PORT = parseInt(process.env.API_WORKOUT_PORT ?? '') || 8000;
    API_BLOG_PORT = parseInt(process.env.API_BLOG_PORT ?? '') || 8000;
}

export const SETTINGS = new Settings();


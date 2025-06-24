import { config } from 'dotenv'
config()

class Settings {
    PORT = parseInt(process.env.PORT || '3001', 10)
    DB_HOST = process.env.DB_HOST || 'user-db'
    DB_PORT = parseInt(process.env.DB_PORT || '5432', 10)
    DB_NAME = process.env.DB_NAME || 'user_db'
    DB_USER = process.env.DB_USER || 'test'
    DB_PASSWORD = process.env.DB_PASSWORD || 'test'

    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret'
}

export default new Settings()
import { config } from 'dotenv'
config()

class Settings {
    PORT = parseInt(process.env.PORT || '3000', 10)
    DB_HOST = process.env.DB_HOST || 'auth-db'
    DB_PORT = parseInt(process.env.DB_PORT || '5432', 10)
    DB_NAME = process.env.DB_NAME || 'auth_db'
    DB_USER = process.env.DB_USER || 'test'
    DB_PASSWORD = process.env.DB_PASSWORD || 'test'

    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret'
    JWT_ACCESS_TOKEN_LIFETIME = parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME || '3600', 10)

    USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001'
}

export default new Settings()
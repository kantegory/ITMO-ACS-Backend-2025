import { config } from 'dotenv'
config()

class Settings {
    PORT = parseInt(process.env.PORT || '3004', 10)
    DB_HOST = process.env.DB_HOST || 'booking-db'
    DB_PORT = parseInt(process.env.DB_PORT || '5432', 10)
    DB_NAME = process.env.DB_NAME || 'booking_db'
    DB_USER = process.env.DB_USER || 'test'
    DB_PASSWORD = process.env.DB_PASSWORD || 'test'

    USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001'
    PROPERTY_SERVICE_URL = process.env.PROPERTY_SERVICE_URL || 'http://property-service:3002'
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret'
}

export default new Settings()
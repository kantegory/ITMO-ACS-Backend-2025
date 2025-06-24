import { config } from 'dotenv'
config()

class Settings {
    PORT = parseInt(process.env.PORT || '3005', 10)
    DB_HOST = process.env.DB_HOST || 'message-db'
    DB_PORT = parseInt(process.env.DB_PORT || '5432', 10)
    DB_NAME = process.env.DB_NAME || 'message_db'
    DB_USER = process.env.DB_USER || 'test'
    DB_PASSWORD = process.env.DB_PASSWORD || 'test'

    USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001'
    BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL || 'http://booking-service:3004'
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret'
}

export default new Settings()
import { config } from 'dotenv'
config()

class Settings {
    PORT = parseInt(process.env.PORT || '8000', 10)
    AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3000'
    USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001'
    PROPERTY_SERVICE_URL = process.env.PROPERTY_SERVICE_URL || 'http://localhost:3002'
    PHOTO_SERVICE_URL = process.env.PHOTO_SERVICE_URL || 'http://localhost:3003'
    BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL || 'http://localhost:3004'
    MESSAGE_SERVICE_URL = process.env.MESSAGE_SERVICE_URL || 'http://localhost:3005'
}

export default new Settings()
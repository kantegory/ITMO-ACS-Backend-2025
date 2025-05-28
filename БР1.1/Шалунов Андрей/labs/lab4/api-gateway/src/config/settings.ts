import { config } from 'dotenv'
config()

class Settings {
    PORT = parseInt(process.env.PORT || '8000', 10)
    AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:3000'
    USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001'
    PROPERTY_SERVICE_URL = process.env.PROPERTY_SERVICE_URL || 'http://property-service:3002'
    PHOTO_SERVICE_URL = process.env.PHOTO_SERVICE_URL || 'http://photo-service:3003'
    BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL || 'http://booking-service:3004'
    MESSAGE_SERVICE_URL = process.env.MESSAGE_SERVICE_URL || 'http://message-service:3005'
}

export default new Settings()
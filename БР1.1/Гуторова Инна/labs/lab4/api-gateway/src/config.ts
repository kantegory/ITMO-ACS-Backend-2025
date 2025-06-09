export const SERVICE_PORT = process.env.PORT || 3003;
export const SERVICE_URLS = {
  USER_SERVICE: process.env.USER_SERVICE_URL || 'http://user-service:3000',
  TRAVEL_SERVICE: process.env.TRAVEL_SERVICE_URL || 'http://travel-service:3001',
  BOOKING_SERVICE: process.env.BOOKING_SERVICE_URL || 'http://booking-service:3002',
};

export const AUTH_TIMEOUT = process.env.AUTH_TIMEOUT || '5000';
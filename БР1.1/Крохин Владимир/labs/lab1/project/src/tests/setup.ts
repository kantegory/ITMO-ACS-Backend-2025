import 'reflect-metadata';

// Увеличиваем таймаут для тестов
jest.setTimeout(30000);

// Глобальные моки
jest.mock('../config/settings', () => ({
    SETTINGS: {
        JWT_SECRET_KEY: 'test-secret-key',
        JWT_ACCESS_TOKEN_LIFETIME: '1h'
    }
})); 